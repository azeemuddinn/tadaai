import TadaPlanner from "@/components/TadaPlanner";

export default function Home() {
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <symbol id="spk" viewBox="0 0 24 24">
          <path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" />
        </symbol>
      </svg>

      <header className="w-[min(1240px,calc(100%-80px))] mx-auto min-h-[84px] flex items-center justify-between">
        <a
          className="wordmark relative inline-flex items-end pl-0"
          href="#top"
          aria-label="Ta-da home"
        >
          <span className="font-cormorant italic font-semibold text-[2.35rem] leading-[1] text-[var(--ink)]">
            tada
          </span>
          <svg
            className="wand w-[40px] h-[30px] mx-[-5px] mb-[4px] ml-[2px] overflow-visible"
            viewBox="0 0 40 30"
            aria-hidden="true"
          >
            <line
              className="stroke-[2.6] stroke-linecap-round stroke-[var(--ink)]"
              x1="4"
              y1="26"
              x2="26"
              y2="9"
            />
            <line
              className="stroke-[2.6] stroke-linecap-round stroke-[var(--butter)]"
              x1="22.5"
              y1="11.7"
              x2="26"
              y2="9"
            />
            <use
              className="fill-[var(--coral)] origin-center animate-[twinkle_0.6s_0.85s_both,glint_3.6s_2.4s_ease-in-out_infinite]"
              href="#spk"
              x="17"
              y="0"
              width="18"
              height="18"
            />
          </svg>
          <span className="font-cormorant italic font-semibold text-[2.35rem] leading-[1] text-[var(--coral)] ml-[1px]">
            !
          </span>
          <svg
            className="absolute right-[-15px] top-[-3px] w-[11px] h-[11px] fill-[var(--coral)]"
            aria-hidden="true"
          >
            <use href="#spk" />
          </svg>
          <svg
            className="absolute right-[-21px] top-[17px] w-[7px] h-[7px] fill-[var(--coral)]"
            aria-hidden="true"
          >
            <use href="#spk" />
          </svg>
        </a>
        <span className="text-[var(--muted)] text-[0.85rem] hidden md:inline">
          Thoughtful surprise plans for very good people.
        </span>
      </header>

      <main id="top">
        <TadaPlanner />
      </main>
    </>
  );
}
