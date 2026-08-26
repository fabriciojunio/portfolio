import { useTextos } from "./i18n";

export default function Footer() {
  const t = useTextos();

  return (
    <footer className="border-t border-white/5 px-6 md:px-10 py-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between text-[12.5px] font-mono text-[#767676]">
        <div>
          © 2026 Fabrício Júnio · Bauru, SP
        </div>

        <div className="flex items-center gap-5">
          <a
            href="/lab"
            className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors"
            title={t.rodape.labTitulo}
          >
            {t.rodape.lab}
          </a>
          <a
            href="https://github.com/fabriciojunio/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9a9a9a] hover:text-[#ffffff] transition-colors"
          >
            {t.rodape.codigo}
          </a>
        </div>
      </div>
    </footer>
  );
}
