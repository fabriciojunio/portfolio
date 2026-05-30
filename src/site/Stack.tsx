import { STACK_GROUPS } from "./data";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-[1280px] mx-auto"
    >
      <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9b958a]">
            03 / stack
          </p>
          <h2 className="mt-4 font-serif text-[42px] md:text-[54px] leading-[1.02] text-[#f5f1e8]">
            Escolho a <em className="text-[#e8b450] not-italic">ferramenta</em><br />pelo problema.
          </h2>
          <p className="mt-6 text-[14.5px] text-[#9b958a] max-w-[360px] leading-relaxed">
            Não acredito em fanboy de stack. Java porque banco, Python porque ML, TypeScript porque toda a web vive nele.
          </p>
        </div>

        <div className="space-y-8">
          {STACK_GROUPS.map((g) => (
            <div key={g.label} className="grid grid-cols-[100px_1fr] gap-6 items-start border-t border-white/5 pt-6">
              <div className="font-mono text-[11px] uppercase tracking-[1.6px] text-[#e8b450]">
                {g.label}
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 m-0 p-0 list-none">
                {g.items.map((it) => (
                  <li key={it} className="font-serif text-[18px] md:text-[22px] text-[#f5f1e8] leading-snug">
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
