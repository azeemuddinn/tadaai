"use client";

import React, { useState } from "react";

const OCCURRENCES: Record<
  string,
  { when: string; title: string; ph: string; items: [string, string, string][] }
> = {
  Birthday: {
    when: "When is the birthday?",
    title: "A Birthday Surprise",
    ph: "I want to surprise my best friend for her 30th birthday. She loves quiet places, good food and sunsets…",
    items: [
      [
        "5:30 PM",
        "Golden-hour start",
        "A quiet spot with warm light, and a reason for them to turn up.",
      ],
      [
        "7:30 PM",
        "Dinner with the right people",
        "A table for the few who matter, somewhere nobody rushes you.",
      ],
      [
        "9:30 PM",
        "A gift that says you noticed",
        "Something small, built around a detail they once mentioned.",
      ],
    ],
  },
  Anniversary: {
    when: "When is the anniversary?",
    title: "An Anniversary Surprise",
    ph: "I want to surprise my wife for our 10th anniversary. She loves quiet places, good food and sunsets…",
    items: [
      [
        "6:00 PM",
        "Sunset, just the two of you",
        "A quiet spot with just enough golden light to begin the evening.",
      ],
      [
        "7:30 PM",
        "Dinner that lingers",
        "A relaxed table where the conversation can take its time.",
      ],
      [
        "9:30 PM",
        "Something only you would know",
        "A personal touch connected to the little details you shared.",
      ],
    ],
  },
  "Date night": {
    when: "When is the date?",
    title: "A Date Night, Planned",
    ph: "I want to plan a date night that feels like a break from everything. We love live music and street food…",
    items: [
      [
        "6:30 PM",
        "Start somewhere unexpected",
        "A short activity to get you out of your usual routine.",
      ],
      [
        "8:00 PM",
        "The main table",
        "Booked ahead, with a seat you would not think to ask for.",
      ],
      [
        "10:00 PM",
        "One last stop",
        "Dessert or a walk, whichever the evening calls for.",
      ],
    ],
  },
  Proposal: {
    when: "When do you want to ask?",
    title: "A Proposal, Planned",
    ph: "I want to propose somewhere that matters to us. She loves old places, quiet mornings and handwritten notes…",
    items: [
      [
        "5:00 PM",
        "Getting them there",
        "A believable reason to arrive at the right place at the right time.",
      ],
      [
        "5:45 PM",
        "The moment",
        "Set up quietly, with someone nearby to capture it.",
      ],
      [
        "7:30 PM",
        "Dinner for two",
        "Somewhere calm to let it sink in, with friends told for later.",
      ],
    ],
  },
  "Just because": {
    when: "When should this happen?",
    title: "A Just-Because Surprise",
    ph: "I want to do something nice for no reason at all. They have had a long month and love small things…",
    items: [
      [
        "4:00 PM",
        "The first small thing",
        "A note or a favourite snack waiting where they will find it.",
      ],
      [
        "6:30 PM",
        "An easy evening",
        "Their favourite food, no plans to keep up with.",
      ],
      [
        "9:00 PM",
        "The thing they did not expect",
        "One small gesture that shows you were paying attention.",
      ],
    ],
  },
};

export default function TadaPlanner() {
  const [step, setStep] = useState<
    "start" | "question" | "ready" | "thinking" | "plan"
  >("start");
  const [ideaText, setIdeaText] = useState("");
  const [selectedPill, setSelectedPill] = useState("Birthday");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentChoice, setCurrentChoice] = useState("");
  const [questionsList, setQuestionsList] = useState<
    { prompt: string; choices: string[] }[]
  >([]);
  const [planData, setPlanData] = useState({
    city: "Hyderabad",
    budget: "₹20,000",
    total: "₹17,500",
  });
  const [isApproved, setIsApproved] = useState(false);

  const activeOcc = OCCURRENCES[selectedPill] || OCCURRENCES.Birthday;

  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = ideaText.trim() || activeOcc.ph;
    const lower = text.toLowerCase();

    const first =
      lower.includes("sunset") || lower.includes("quiet")
        ? {
            prompt: "Should we lean into the feeling you described?",
            choices: [
              "Quiet and romantic",
              "Golden-hour adventure",
              "A little bit of both",
              "Something unexpected",
              "I’m not sure",
            ],
          }
        : {
            prompt: "First, what kind of surprise would feel most like them?",
            choices: [
              "Romantic",
              "Relaxing",
              "Adventurous",
              "Something unexpected",
              "I’m not sure",
            ],
          };

    const generated = [
      first,
      {
        prompt: activeOcc.when,
        choices: [
          "Within a month",
          "In 2–3 months",
          "Later this year",
          "I haven’t decided",
        ],
      },
      {
        prompt: "What would you like to spend?",
        choices: [
          "Around ₹10,000",
          "Around ₹20,000",
          "Around ₹30,000",
          "I’m flexible",
        ],
      },
    ];

    if (
      !lower.includes("hyderabad") &&
      !lower.includes("mumbai") &&
      !lower.includes("delhi")
    ) {
      generated.push({
        prompt: "What city will this happen in?",
        choices: ["Hyderabad", "Mumbai", "Delhi", "Somewhere else"],
      });
    }
    generated.push({
      prompt: "Is there anything they absolutely love?",
      choices: [
        "Quiet places and good food",
        "Sunsets and long walks",
        "Thoughtful little gifts",
        "I’m not sure yet",
      ],
    });

    setQuestionsList(generated);
    setQuestionIndex(0);
    setAnswers({});
    setCurrentChoice("");
    setStep("question");
  };

  const handleNextQuestion = () => {
    if (!currentChoice) return;
    if (questionIndex < questionsList.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentChoice(answers[questionIndex + 1] || "");
    } else {
      setStep("ready");
    }
  };

  const handleCreatePlan = () => {
    setStep("thinking");
    const city =
      Object.values(answers).find((v) =>
        ["Hyderabad", "Mumbai", "Delhi", "Somewhere else"].includes(v),
      ) || "Hyderabad";
    const budgetRaw =
      Object.values(answers).find((v) => v && v.includes("₹")) ||
      "Around ₹20,000";
    const numericBudget = parseInt(budgetRaw.replace(/\D/g, ""), 10) || 20000;
    const total =
      "₹" +
      (Math.round((numericBudget * 0.88) / 100) * 100).toLocaleString("en-IN");

    setTimeout(() => {
      setPlanData({
        city: city.includes("Somewhere") ? "your city" : city,
        budget: budgetRaw.replace("Around ", ""),
        total,
      });
      setStep("plan");
    }, 2050);
  };

  return (
    <section className="w-[min(1240px,calc(100%-80px))] mx-auto py-11 md:py-[44px] pb-[100px] grid grid-cols-1 md:grid-cols-[0.72fr_1.28fr] gap-[84px] items-start">
      {/* Left Column Copy */}
      <div className="planner-copy" aria-live="polite">
        <p className="text-[var(--coral)] text-[0.68rem] font-bold tracking-[0.16em] uppercase mb-[22px]">
          <span className="font-cormorant text-[0.9rem] mr-2">
            {step === "start" ? "01" : step === "question" ? "02" : "03"}
          </span>
          {step === "start" && "Start with an idea"}
          {step === "question" && "A few good questions"}
          {(step === "ready" || step === "thinking") && "Almost there"}
          {step === "plan" && "Your Ta-da"}
        </p>
        <h2 className="font-cormorant font-medium text-[clamp(3rem,5.8vw,5.15rem)] leading-[0.88] tracking-[-0.03em] mb-[18px]">
          {step === "start" && (
            <>
              What are you{" "}
              <em className="text-[var(--coral)] italic">thinking</em> of?
            </>
          )}
          {step === "question" && (
            <>
              Let’s make it{" "}
              <em className="text-[var(--coral)] italic">personal.</em>
            </>
          )}
          {(step === "ready" || step === "thinking") && (
            <>
              This is starting to feel like{" "}
              <em className="text-[var(--coral)] italic">them.</em>
            </>
          )}
          {step === "plan" && (
            <>
              Here’s what I’m{" "}
              <em className="text-[var(--coral)] italic">thinking.</em>
            </>
          )}
        </h2>
        <p className="text-[var(--muted)] text-[1rem] max-w-[320px]">
          {step === "start" &&
            "Tell us whatever you've got so far. It doesn't have to be perfect."}
          {step === "question" &&
            "One small answer at a time. We’ll take it from here."}
          {(step === "ready" || step === "thinking") &&
            "A few more seconds and you’ll have something worth making happen."}
          {step === "plan" &&
            "A thoughtful plan, built around the little details you shared."}
        </p>
      </div>

      {/* Right Stage Column */}
      <div className="planner-stage min-w-0">
        {/* Step 1: Start View */}
        {step === "start" && (
          <form
            className="bg-[var(--white)] border border-[rgba(42,19,32,0.18)] shadow-[7px_8px_0_var(--paper2)] p-[27px_29px_29px] rounded-[4px] relative focus-within:border-[var(--coral)] focus-within:shadow-[7px_8px_0_var(--paper2),0_0_0_2px_var(--coral)]"
            onSubmit={handleIdeaSubmit}
          >
            <div className="flex justify-between mb-[13px] text-[var(--muted)] text-[0.84rem] font-semibold">
              <span>I want to surprise someone with…</span>
              <span className="text-[#8c7280] font-normal">
                {ideaText.length}/240
              </span>
            </div>
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              maxLength={240}
              rows={4}
              placeholder={activeOcc.ph}
              className="w-full min-h-[144px] pb-[21px] resize-y border-0 border-b border-[var(--line)] bg-transparent text-[var(--ink)] font-cormorant text-[1.9rem] leading-[1.08] outline-none placeholder:text-[#9a8190]"
              aria-label="Describe your surprise idea"
            />
            <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-[20px] pt-[24px]">
              <div className="picker">
                <small className="block mb-[11px] text-[var(--muted)] text-[0.84rem] font-semibold">
                  It’s for a…
                </small>
                <div className="flex flex-wrap gap-[7px]">
                  {Object.keys(OCCURRENCES).map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setSelectedPill(occ)}
                      className={`px-[14px] py-[8px] border rounded-[999px] text-[0.88ln] transition ${
                        selectedPill === occ
                          ? "bg-[var(--mango)] border-[var(--mango)] text-[var(--ink)] font-semibold"
                          : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--coral)] hover:text-[var(--coral)]"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-[11px] min-h-[50px] px-[18px] bg-[var(--sun)] text-[var(--white)] text-[0.92rem] font-bold rounded-[3px] hover:bg-[var(--sun-deep)] hover:-translate-y-[3px] transition"
              >
                Start planning
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Question View */}
        {step === "question" && questionsList.length > 0 && (
          <div className="bg-[var(--white)] border border-[var(--line)] shadow-[7px_8px_0_var(--paper2)] p-[27px_29px_29px] rounded-[4px]">
            <div className="flex justify-between items-center mb-[17px] text-[var(--coral)] text-[0.84rem] font-semibold uppercase">
              <span>Ta-da is thinking with you</span>
              <span className="text-[var(--muted)] font-normal">
                {questionIndex + 1} of {questionsList.length}
              </span>
            </div>
            <div className="h-[3px] -mt-[4px] mb-[18px] overflow-hidden rounded-[2px] bg-[var(--paper2)]">
              <div
                className="h-full bg-[var(--coral)] transition-all duration-350"
                style={{
                  width: `${((questionIndex + 1) / questionsList.length) * 100}%`,
                }}
              />
            </div>
            <div className="mb-[22px] p-[13px_15px] border-l-[3px] border-[var(--mango)] bg-[#fff8fb] text-[var(--muted)] font-cormorant italic text-[1.25rem] leading-[1.15]">
              “{ideaText.trim() || activeOcc.ph}”
            </div>
            <p className="text-[var(--ink)] font-cormorant text-[1.55rem] leading-[1.08] mb-[27px]">
              Okay, I have a starting point. Let me ask you a few things.
            </p>
            <div>
              <p className="text-[var(--ink)] font-cormorant text-[1.65rem] leading-[1.05] mb-[17px]">
                {questionsList[questionIndex].prompt}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[9px]">
                {questionsList[questionIndex].choices.map((choiceVal) => (
                  <button
                    key={choiceVal}
                    type="button"
                    onClick={() => {
                      setCurrentChoice(choiceVal);
                      setAnswers({ ...answers, [questionIndex]: choiceVal });
                    }}
                    className={`p-[15px_16px] border rounded-[6px] text-left text-[0.98rem] transition ${
                      currentChoice === choiceVal
                        ? "border-[var(--coral)] bg-[#ffe8f1] text-[var(--ink)] shadow-[0_0_0_2px_#ff4f9a1c]"
                        : "border-[var(--line)] bg-[var(--white)] text-[var(--ink)] hover:border-[var(--coral)]"
                    }`}
                  >
                    {choiceVal}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-[25px]">
              <button
                type="button"
                onClick={() => {
                  if (questionIndex > 0) {
                    setQuestionIndex(questionIndex - 1);
                    setCurrentChoice(answers[questionIndex - 1] || "");
                  } else {
                    setStep("start");
                  }
                }}
                className="bg-transparent text-[var(--muted)] text-[0.88rem] hover:text-[var(--coral)]"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={!currentChoice}
                onClick={handleNextQuestion}
                className="inline-flex items-center justify-center min-h-[50px] px-[18px] bg-[var(--sun)] text-[var(--white)] text-[0.92rem] font-bold rounded-[3px] disabled:opacity-45 disabled:cursor-not-allowed hover:bg-[var(--sun-deep)]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ready View */}
        {step === "ready" && (
          <div className="bg-[var(--white)] border border-[var(--line)] shadow-[7px_8px_0_var(--paper2)] p-[31px_32px_29px] rounded-[4px] text-center">
            <div className="inline-block px-[12px] py-[4px] border border-[var(--coral)] rounded-[99px] text-[var(--coral)] font-bold text-[0.8rem] mb-[14px]">
              Ready
            </div>
            <h3 className="font-cormorant font-medium text-[2.25rem] leading-[0.93] text-[var(--ink)] m-0">
              I think I’ve got enough
              <br />
              to make this personal.
            </h3>
            <p className="max-w-[310px] mx-auto my-[13px] mb-[25px] text-[var(--muted)] text-[0.98rem]">
              I’ve got the feeling, the details, and enough room to make it
              special.
            </p>
            <button
              type="button"
              onClick={handleCreatePlan}
              className="inline-flex items-center justify-center min-h-[50px] px-[18px] bg-[var(--sun)] text-[var(--white)] text-[0.92rem] font-bold rounded-[3px] min-w-[178px] hover:bg-[var(--sun-deep)]"
            >
              Create my plan
            </button>
          </div>
        )}

        {/* Step 4: Thinking View */}
        {step === "thinking" && (
          <div className="bg-[var(--white)] border border-[var(--line)] shadow-[7px_8px_0_var(--paper2)] p-[31px_32px_29px] rounded-[4px] text-left">
            <div className="flex justify-between items-center mb-[17px] text-[var(--coral)] text-[0.84rem] font-semibold uppercase">
              <span>Ta-da is thinking</span>
              <span className="text-[var(--muted)] font-normal">
                One moment
              </span>
            </div>
            <h3 className="font-cormorant font-medium text-[2.25rem] text-[var(--ink)] mb-[24px]">
              Creating your surprise…
            </h3>
            <ul className="grid gap-[13px] m-0 p-0 list-none">
              <li className="flex items-center gap-[10px] text-[var(--muted)] text-[0.95rem]">
                <span className="w-[8px] h-[8px] rounded-full bg-[var(--coral)]" />{" "}
                Understanding what they love…
              </li>
              <li className="flex items-center gap-[10px] text-[var(--muted)] text-[0.95rem]">
                <span className="w-[8px] h-[8px] rounded-full bg-[var(--coral)]" />{" "}
                Finding the right kind of experience…
              </li>
              <li className="flex items-center gap-[10px] text-[var(--muted)] text-[0.95rem]">
                <span className="w-[8px] h-[8px] rounded-full bg-[var(--coral)]" />{" "}
                Putting the pieces together…
              </li>
              <li className="flex items-center gap-[10px] text-[var(--muted)] text-[0.95rem]">
                <span className="w-[8px] h-[8px] rounded-full bg-[var(--coral)]" />{" "}
                Making it personal…
              </li>
            </ul>
          </div>
        )}

        {/* Step 5: Plan View */}
        {step === "plan" && (
          <div className="bg-[var(--white)] border border-[var(--line)] shadow-[7px_8px_0_var(--paper2)] p-[31px_32px_29px] rounded-[4px]">
            <div className="flex justify-between items-center mb-[21px] text-[var(--coral)] text-[0.84rem] font-semibold uppercase">
              <span>Okay, I’ve got something for you.</span>
              <span className="text-[var(--muted)] font-normal">
                Ta-da plan
              </span>
            </div>
            <h3 className="font-cormorant font-medium text-[2.7rem] text-[var(--ink)] mb-[8px]">
              {activeOcc.title}
            </h3>
            <div className="flex flex-wrap gap-[7px_17px] mb-[24px] text-[var(--muted)] text-[0.9rem]">
              <span>
                <b>Occasion:</b> {selectedPill}
              </span>
              <span>
                <b>Where:</b> {planData.city}
              </span>
              <span>
                <b>Budget:</b> {planData.budget}
              </span>
            </div>
            <div className="relative pl-[22px]">
              <div className="absolute left-[4px] top-[24px] bottom-[24px] w-[1px] bg-[var(--coral)] opacity-40" />
              {activeOcc.items.map(([time, title, desc], idx) => (
                <div
                  key={idx}
                  className="relative grid grid-cols-[76px_1fr] py-[15px] border-t border-dashed border-[var(--line)] first:border-t-0"
                >
                  <div className="absolute -left-[22px] top-[21px] w-[9px] h-[9px] rounded-full bg-[var(--coral)]" />
                  <time className="text-[var(--coral)] text-[0.85rem] font-bold pt-[2px]">
                    {time}
                  </time>
                  <div>
                    <h4 className="font-cormorant text-[1.6srem] text-[var(--ink)] m-0 mb-[3px]">
                      {title}
                    </h4>
                    <p className="text-[var(--muted)] text-[0.92rem] leading-[1.45] m-0">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-[20px] text-[var(--muted)] text-[0.92rem]">
              <span>Estimated total</span>
              <strong className="text-[var(--ink)] text-[0.95rem]">
                {planData.total}
              </strong>
            </div>
            {!isApproved ? (
              <div className="flex justify-center gap-[9px] mt-[25px]">
                <button
                  type="button"
                  onClick={() => setStep("question")}
                  className="min-h-[50px] px-[16px] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] font-bold rounded-[3px] hover:border-[var(--coral)] hover:text-[var(--coral)]"
                >
                  Let me change something
                </button>
                <button
                  type="button"
                  onClick={() => setIsApproved(true)}
                  className="inline-flex items-center justify-center min-h-[50px] px-[18px] bg-[var(--sun)] text-[var(--white)] text-[0.92rem] font-bold rounded-[3px] hover:bg-[var(--sun-deep)]"
                >
                  Looks good
                </button>
              </div>
            ) : (
              <div className="mt-[18px] p-[16px_18px] rounded-[4px] bg-[var(--butter)] text-[var(--ink)] text-left">
                <p className="font-cormorant text-[1.5rem] leading-[1.1] m-0 mb-[12px]">
                  Lovely. Your plan is ready to make happen.
                </p>
                <div className="flex flex-wrap items-center gap-[9px]">
                  <button
                    type="button"
                    onClick={() => alert("Plan copied to clipboard!")}
                    className="min-h-[50px] px-[16px] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] font-bold rounded-[3px]"
                  >
                    Share plan
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="min-h-[50px] px-[16px] border border-[var(--line)] bg-[var(--white)] text-[var(--ink)] font-bold rounded-[3px]"
                  >
                    Save as PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApproved(false);
                      setStep("start");
                      setIdeaText("");
                    }}
                    className="bg-transparent text-[var(--muted)] text-[0.88rem]"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
