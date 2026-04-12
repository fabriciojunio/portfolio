export default function Education() {
  return (
    <section id="formacao" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent-green mb-2">
        formação
      </p>
      <h2 className="text-[22px] font-semibold text-text-primary mb-8">Educação</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-[14px] text-text-primary font-medium">Ciência da Computação</h3>
          <p className="text-[12px] text-text-secondary mt-1">UNISAGRADO, Bauru, SP</p>
          <span
            className="inline-block mt-3 text-[10px] uppercase tracking-[1px] px-2 py-0.5 rounded"
            style={{
              color: "#f59e0b",
              backgroundColor: "#f59e0b1a",
              border: "1px solid #f59e0b33",
            }}
          >
            Em andamento
          </span>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-[14px] text-text-primary font-medium">Programas</h3>
          <ul className="mt-3 space-y-2">
            <li className="text-[12px] text-text-secondary">
              <span className="text-text-primary">Incubadora Saruê</span> — UNESP Bauru
            </li>
            <li className="text-[12px] text-text-secondary">
              <span className="text-text-primary">Programa Ignite</span> — Wadhwani Foundation
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
