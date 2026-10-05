import { useEffect, useRef, useState } from "react";
import Grafico from "./Grafico";
import { formatar, preencherLeitura } from "./formato";
import { RESULTADOS } from "./dados";
import type { AlavancaContinua, ProjetoResultado } from "./tipos";

/**
 * Os seis projetos quantitativos, com a hipótese de cada um virada em controle.
 *
 * O README de cada um já traz o número. O que ele não consegue mostrar é que o
 * número depende de uma escolha, e que a escolha quase sempre pesa mais que o
 * algoritmo. Aqui a pessoa mexe e vê.
 *
 * Nada é calculado no navegador: cada ponto das curvas saiu de um experimento
 * que rodou em Python, e `scripts/extrair-resultados.mjs` traz os artefatos
 * para cá. O que o navegador faz é ler o ponto onde a alavanca parou.
 */
export default function Resultados() {
  const [aberto, setAberto] = useState<string>(() => doEndereco());

  // O primeiro efeito leva até o projeto pedido; o segundo mantém o menu
  // apontando para o que está na tela. Sem o segundo, quem rolava a página a
  // dedo via o menu travado no projeto de onde saiu, e o nome de cima deixava
  // de dizer onde a pessoa está.
  const pediuRolagem = useRef(true);

  useEffect(() => {
    if (!pediuRolagem.current) return;
    pediuRolagem.current = false;
    const alvo = document.getElementById(`r-${aberto}`);
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [aberto]);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        // Entre duas seções visíveis ao mesmo tempo, vale a que ocupa mais
        // tela: escolher a primeira da lista faria o menu voltar atrás no meio
        // da rolagem.
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visivel) return;
        const slug = visivel.target.id.replace(/^r-/, "");
        setAberto((atual) => (atual === slug ? atual : slug));
      },
      // A faixa de interesse é o terço de cima da janela: é onde fica o título
      // da seção que a pessoa está lendo.
      { rootMargin: "-10% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const p of RESULTADOS) {
      const el = document.getElementById(`r-${p.slug}`);
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, []);

  const escolher = (slug: string) => {
    pediuRolagem.current = true;
    setAberto(slug);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <Cabecalho aberto={aberto} aoEscolher={escolher} />

      <div className="max-w-[1180px] mx-auto px-6 md:px-10 pb-32">
        {RESULTADOS.map((p) => (
          <Secao key={p.slug} projeto={p} />
        ))}

        <Rodape />
      </div>
    </main>
  );
}

/** O slug pedido na URL, aceitando /resultados/lastro e /resultados#lastro. */
function doEndereco(): string {
  if (typeof window === "undefined") return RESULTADOS[0].slug;
  const caminho = window.location.pathname.replace(/\/+$/, "").split("/");
  const ultimo = caminho[caminho.length - 1]?.toLowerCase();
  const fragmento = window.location.hash.replace(/^#/, "").toLowerCase();
  const pedido = RESULTADOS.find((p) => p.slug === ultimo || p.slug === fragmento);
  return pedido ? pedido.slug : RESULTADOS[0].slug;
}

function Cabecalho({
  aberto,
  aoEscolher,
}: {
  aberto: string;
  aoEscolher: (slug: string) => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        {/*
          O botão de voltar fica no cabeçalho e não só no rodapé: esta página é
          longa, e quem entra por link direto de um repositório não tem para
          onde voltar no histórico do navegador.
        */}
        <a
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.4px] text-[#9a9a9a] hover:text-[#ffffff] transition-colors shrink-0"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          voltar
        </a>
        <span aria-hidden className="w-px h-4 bg-white/15 shrink-0" />
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {RESULTADOS.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => aoEscolher(p.slug)}
              className={`font-mono text-[11px] uppercase tracking-[1.4px] transition-colors ${
                aberto === p.slug ? "text-[#ffffff]" : "text-[#767676] hover:text-[#ededed]"
              }`}
            >
              {p.nome}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Secao({ projeto }: { projeto: ProjetoResultado }) {
  return (
    <section id={`r-${projeto.slug}`} className="pt-24 md:pt-32 scroll-mt-20">
      <p className="font-mono text-[10.5px] uppercase tracking-[2px] text-[#9a9a9a]">
        {projeto.slug}
      </p>
      <h2 className="mt-4 font-serif text-[38px] md:text-[54px] leading-[1.08] text-[#ffffff]">
        {projeto.nome}
      </h2>
      <p className="mt-5 max-w-[640px] text-[17px] md:text-[19px] text-[#d4d4d4] leading-[1.75]">
        {projeto.pergunta}
      </p>

      <dl className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-white/5 pt-7">
        <Campo rotulo="Fonte" valor={projeto.dado.fonte} />
        <Campo rotulo="Recorte" valor={projeto.dado.recorte} />
        <Campo rotulo="O que o dado não tem" valor={projeto.dado.limitacao} />
      </dl>

      <div className="mt-14 grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
        <div className="lg:sticky lg:top-24">
          <p className="font-serif text-[46px] md:text-[60px] leading-[1.02] text-[#ffffff] tracking-[-0.02em]">
            {projeto.manchete.valor}
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[1.4px] text-[#9a9a9a] leading-relaxed">
            {projeto.manchete.rotulo}
          </p>
          <p className="mt-6 text-[15px] text-[#d4d4d4] leading-[1.85]">
            {projeto.manchete.leitura}
          </p>
        </div>

        <Alavanca projeto={projeto} />
      </div>

      <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <Contraste projeto={projeto} />
        <Achado projeto={projeto} />
      </div>

      <div className="mt-12 border-l-2 border-white/15 pl-6">
        <p className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-[#9a9a9a]">
          o limite deste número
        </p>
        <p className="mt-3 max-w-[760px] text-[15px] text-[#d4d4d4] leading-[1.85]">
          {projeto.limite}
        </p>
      </div>
    </section>
  );
}

function Campo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[1.6px] text-[#767676]">
        {rotulo}
      </dt>
      <dd className="mt-2 text-[14px] text-[#d4d4d4] leading-[1.7]">{valor}</dd>
    </div>
  );
}

function Alavanca({ projeto }: { projeto: ProjetoResultado }) {
  const { alavanca } = projeto;
  const [qualSerie, setQualSerie] = useState(0);

  const serie: AlavancaContinua["serie"] =
    alavanca.tipo === "continua" ? alavanca.serie : alavanca.series[qualSerie].pontos;

  const [indice, setIndice] = useState(() => Math.floor((serie.length - 1) / 2));
  const seguro = Math.min(indice, serie.length - 1);
  const ponto = serie[seguro];

  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[1.6px] text-[#ffffff]">
        {alavanca.titulo}
      </p>
      <p className="mt-3 max-w-[620px] text-[14.5px] text-[#9a9a9a] leading-[1.8]">
        {alavanca.explicacao}
      </p>

      {alavanca.tipo === "categorica" ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {alavanca.series.map((s, i) => (
            <button
              key={s.rotulo}
              type="button"
              onClick={() => {
                setQualSerie(i);
                setIndice((atual) => Math.min(atual, alavanca.series[i].pontos.length - 1));
              }}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-[1.2px] border transition-colors ${
                qualSerie === i
                  ? "border-[#ffffff] text-[#ffffff]"
                  : "border-white/15 text-[#767676] hover:text-[#ededed] hover:border-white/30"
              }`}
            >
              {s.rotulo}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-7 bg-[#101010] border border-white/10 p-4 md:p-6">
        <Grafico
          serie={serie}
          secundaria={alavanca.tipo === "continua" ? alavanca.serieSecundaria : undefined}
          eixoX={alavanca.eixoX}
          eixoY={alavanca.eixoY}
          marcas={alavanca.marcas}
          indice={seguro}
          rotuloDaSerie={
            alavanca.tipo === "categorica" ? alavanca.series[qualSerie].rotulo : projeto.nome
          }
        />

        <label className="mt-5 block">
          <span className="sr-only">{alavanca.eixoX.rotulo}</span>
          <input
            type="range"
            min={0}
            max={serie.length - 1}
            step={1}
            value={seguro}
            onChange={(e) => setIndice(Number(e.target.value))}
            className="w-full accent-[#ededed] cursor-pointer"
          />
        </label>

        <p className="mt-4 text-[15px] text-[#ededed] leading-[1.75]">
          {preencherLeitura(
            alavanca.leitura,
            formatar(ponto[0], alavanca.eixoX.formato),
            formatar(ponto[1], alavanca.eixoY.formato),
          )}
        </p>

        {alavanca.tipo === "categorica" ? (
          <p className="mt-2 font-mono text-[10.5px] text-[#767676]">
            {alavanca.series[qualSerie].nota}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Contraste({ projeto }: { projeto: ProjetoResultado }) {
  const { contraste } = projeto;
  return (
    <div>
      <h3 className="font-serif text-[23px] md:text-[27px] text-[#ededed] leading-snug">
        {contraste.titulo}
      </h3>
      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr>
            {contraste.colunas.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`border-b border-white/15 pb-3 font-mono text-[10px] uppercase tracking-[1.4px] text-[#767676] font-normal ${
                  i === 0 ? "text-left" : "text-right"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contraste.linhas.map((linha, i) => (
            <tr
              key={linha[0] + String(i)}
              className={i === contraste.destaque ? "text-[#ffffff]" : "text-[#9a9a9a]"}
            >
              {linha.map((celula, j) => (
                <td
                  key={j}
                  className={`border-b border-white/5 py-3 text-[14px] ${
                    j === 0 ? "text-left pr-4" : "text-right font-mono tabular-nums"
                  } ${i === contraste.destaque ? "font-medium" : ""}`}
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 text-[14px] text-[#9a9a9a] leading-[1.8]">{contraste.nota}</p>
    </div>
  );
}

function Achado({ projeto }: { projeto: ProjetoResultado }) {
  const { achado } = projeto;
  return (
    <div>
      <h3 className="font-serif text-[23px] md:text-[27px] text-[#ededed] leading-snug">
        {achado.titulo}
      </h3>
      <ul className="mt-6 m-0 p-0 list-none">
        {achado.linhas.map((l) => (
          <li
            key={l.texto}
            className="flex items-baseline justify-between gap-6 border-b border-white/5 py-3"
          >
            <span className="text-[14px] text-[#9a9a9a]">{l.texto}</span>
            <span className="font-mono text-[13.5px] text-[#ededed] tabular-nums text-right shrink-0">
              {l.valor}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[14px] text-[#9a9a9a] leading-[1.8]">{achado.nota}</p>
    </div>
  );
}

function Rodape() {
  return (
    <footer className="mt-32 border-t border-white/5 pt-10">
      <p className="max-w-[760px] text-[14.5px] text-[#9a9a9a] leading-[1.85]">
        Todo número desta página saiu de um experimento que roda em Python no
        repositório do projeto. Nada é calculado no navegador: um script lê os
        artefatos de cada experimento e gera os dados daqui, para que o número da
        página e o número do repositório não possam divergir.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.4px] text-[#ededed] hover:text-[#ffffff]"
      >
        <span aria-hidden>←</span> voltar ao portfólio
      </a>
    </footer>
  );
}
