import { STACK_GROUPS } from "./data";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative py-28 md:py-40 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#a39c8f]">
            03 · stack
          </p>
          <h2 className="mt-5 font-serif text-[42px] md:text-[58px] leading-[1.08] text-[#f5f1e8]">
            Escolho a <em className="text-[#d4a76a] not-italic">ferramenta</em><br />pelo problema.
          </h2>
          <p className="mt-8 text-[15.5px] text-[#a39c8f] max-w-[360px] leading-[1.9]">
            Não acredito em fanboy de stack. Java porque banco, Python porque ML, TypeScript porque toda a web vive nele.
          </p>
        </div>

        <div className="space-y-0">
          {STACK_GROUPS.map((g) => (
            <div key={g.label} className="grid grid-cols-[100px_1fr] gap-8 items-start border-t border-white/5 py-7">
              <div className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#d4a76a] pt-1">
                {g.label}
              </div>
              <ul className="flex flex-wrap gap-x-7 gap-y-3 m-0 p-0 list-none">
                {g.items.map((it) => (
                  <li key={it} className="font-serif text-[19px] md:text-[23px] text-[#f5f1e8] leading-snug">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
