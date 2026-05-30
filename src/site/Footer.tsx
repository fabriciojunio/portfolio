export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-10 py-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between text-[12.5px] font-mono text-[#6f6a60]">
        <div>
          © 2026 Fabricio Junio · Bauru, SP
        </div>

        <div className="flex items-center gap-5">
          <a
            href="/lab"
            className="text-[#9b958a] hover:text-[#e8b450] transition-colors"
            title="Experimento: o portfolio como IDE no browser"
          >
            /lab · IDE no browser
          </a>
          <a
            href="https://github.com/fabriciojunio/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9b958a] hover:text-[#e8b450] transition-colors"
          >
            codigo deste site
          </a>
        </div>
      </div>
    </footer>
  );
}
