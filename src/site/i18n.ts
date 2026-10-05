import { createContext, useContext } from "react";

/**
 * Três idiomas, com o português como principal.
 *
 * Não é enfeite: recrutador brasileiro lê em português, recrutador de fora
 * fecha a aba antes de chegar no código se a página estiver toda em português,
 * e a América Latina de língua espanhola é o mercado remoto mais próximo em
 * fuso e em cultura de trabalho.
 *
 * O que NÃO é traduzido, de propósito: nome de projeto, nome de tecnologia e
 * os trechos de código. Nome próprio traduzido vira outro projeto, e comentário
 * de código traduzido deixa de bater com o repositório que a pessoa vai abrir.
 */
export type Idioma = "pt" | "en" | "es";

export const IDIOMAS: { codigo: Idioma; rotulo: string; nome: string }[] = [
  { codigo: "pt", rotulo: "PT", nome: "Português" },
  { codigo: "en", rotulo: "EN", nome: "English" },
  { codigo: "es", rotulo: "ES", nome: "Español" },
];

export const IDIOMA_PADRAO: Idioma = "pt";

export interface Textos {
  /** Código de idioma para o atributo lang do documento. */
  htmlLang: string;

  nav: {
    sobre: string;
    trabalho: string;
    stack: string;
    contato: string;
    resultados: string;
    menu: string;
    fechar: string;
    topo: string;
    abrirMenu: string;
    trocarIdioma: string;
  };

  hero: {
    disponivel: string;
    verTrabalho: string;
    conversar: string;
  };

  sobre: {
    secao: string;
    titulo: [string, string, string];
    cargo: string;
    cidade: string;
    formacao: string;
    formacaoValor: string;
    rotuloCargo: string;
    rotuloCidade: string;
    rotuloFormacao: string;
    bio: string;
    longBio: string[];
  };

  trabalho: {
    secao: string;
    titulo: [string, string, string];
    chamada: string;
    blocos: {
      ia: { titulo: string; nota: string };
      parceria: { titulo: string; nota: string };
    };
    acervo: string;
    verDemo: string;
    fechar: string;
  };

  stack: {
    secao: string;
    titulo: [string, string, string];
    nota: string;
    grupos: Record<string, string>;
  };

  contato: {
    secao: string;
    titulo: [string, string, string];
    chamada: string;
    email: string;
  };

  rodape: {
    lab: string;
    labTitulo: string;
    codigo: string;
  };
}

const pt: Textos = {
  htmlLang: "pt-BR",
  nav: {
    sobre: "Sobre",
    trabalho: "Trabalho",
    stack: "Stack",
    contato: "Contato",
    resultados: "Resultados →",
    menu: "Menu",
    fechar: "Fechar",
    topo: "Topo",
    abrirMenu: "Abrir menu",
    trocarIdioma: "Trocar idioma",
  },
  hero: {
    disponivel: "disponível",
    verTrabalho: "Ver trabalho",
    conversar: "Conversar",
  },
  sobre: {
    secao: "01 · sobre",
    titulo: ["IA que ", "funciona", " em produção."],
    cargo: "AI Engineer",
    cidade: "Bauru, SP",
    formacao: "Ciência da Computação, UNISAGRADO",
    formacaoValor: "Ciência da Computação, UNISAGRADO",
    rotuloCargo: "Cargo",
    rotuloCidade: "Cidade",
    rotuloFormacao: "Formação",
    bio: "IA que pode ser auditada: resposta com a fonte, recusa quando a fonte não existe, e número calculado pelo domínio em vez de escrito pelo modelo.",
    longBio: [
      "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Treze clientes, de seguros a judiciário.",
      "Construo IA pensando no que acontece quando o modelo erra. Na PermaneIA o RAG é escrito à mão e responde com a fonte ou diz que não sabe. No Balcão o modelo conversa, mas quem calcula preço é o domínio, e um auditor reprova algarismo sem origem. No CodeReview AI o modelo roda dentro de casa, atrás de fila.",
      "A outra metade é quantitativa, e responde como o número foi validado. O Lastro, meu trabalho de conclusão, prova o método contra estrutura conhecida antes de encostar no dado real. Foi assim que achei um defeito do meu próprio algoritmo.",
      "Modelo em caderno não resolve nada. Por isso API atrás de fila, contêiner, integração contínua que barra a entrega, deriva medida em vez de presumida, e o limite escrito junto com o número.",
    ],
  },
  trabalho: {
    secao: "02 · trabalho",
    titulo: ["Projetos que ", "construí", "."],
    chamada: "Clique em qualquer um: o problema, a decisão que tomei e um trecho de código.",
    blocos: {
      ia: {
        titulo: "IA em produção",
        nota: "Do mais forte para o mais fraco. Os seis projetos quantitativos têm página própria, com a hipótese virada em controle.",
      },
      parceria: {
        titulo: "Parceria e extensão",
        nota: "Com cliente fora da faculdade: a SEDECON, Secretaria de Desenvolvimento Econômico de Bauru, e iniciação científica na Saruê, a incubadora da UNESP.",
      },
    },
    acervo: "back-end, produto e faculdade",
    verDemo: "Rodar a demo interativa",
    fechar: "Fechar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Escolho a ", "ferramenta", " pelo problema."],
    nota: "Escrevi o RAG e as barreiras à mão, sem framework de orquestração, e é por isso que sei dizer onde cada um falha. Python para dado, Java para o que precisa aguentar o sistema do outro lado cair.",
    grupos: {
      "ia aplicada": "IA aplicada",
      avaliacao: "avaliação",
      "dados e modelo": "dados e modelo",
      metodo: "método",
      eixo: "eixo",
      mensageria: "mensageria",
      dados: "dados",
      infra: "infra",
      front: "front",
      "também uso": "também uso",
    },
  },
  contato: {
    secao: "04 · contato",
    titulo: ["Precisa de", "IA que não invente", "?"],
    chamada: "RAG, agente com guarda e modelo em produção, com o back-end que sustenta isso. Respondo em até 24h úteis.",
    email: "E-mail",
  },
  rodape: {
    lab: "/lab · IDE no browser",
    labTitulo: "Experimento: o portfólio como IDE no browser",
    codigo: "código deste site",
  },
};

const en: Textos = {
  htmlLang: "en",
  nav: {
    sobre: "About",
    trabalho: "Work",
    stack: "Stack",
    contato: "Contact",
    resultados: "Results →",
    menu: "Menu",
    fechar: "Close",
    topo: "Top",
    abrirMenu: "Open menu",
    trocarIdioma: "Change language",
  },
  hero: {
    disponivel: "available",
    verTrabalho: "See the work",
    conversar: "Get in touch",
  },
  sobre: {
    secao: "01 · about",
    titulo: ["AI that ", "holds up", " in production."],
    cargo: "AI Engineer",
    cidade: "Bauru, Brazil",
    formacao: "Computer Science, UNISAGRADO",
    formacaoValor: "Computer Science, UNISAGRADO",
    rotuloCargo: "Role",
    rotuloCidade: "Based in",
    rotuloFormacao: "Studying",
    bio: "AI you can audit: answers that cite the source, a refusal when the source is missing, and numbers computed by the domain instead of written by the model.",
    longBio: [
      "I am 21, studying Computer Science at UNISAGRADO, and I work on integration and process automation at Digihub, part of the Lecom group. Thirteen clients, from insurance to the judiciary.",
      "I build AI around what happens when the model is wrong. In PermaneIA the RAG layer is written by hand and answers with the source cited or says it does not know. In Balcão the model talks, but the domain computes the price, and an auditor rejects any digit without a recorded origin. In CodeReview AI the model runs on our own machines, behind a queue.",
      "The other half is quantitative, and it answers how the number was validated. Lastro, my final-year project, proves the method against known structures before touching real data. That is how I found a defect in my own algorithm.",
      "A model in a notebook solves nothing. Hence APIs behind a queue, containers, CI that blocks the release, drift measured rather than assumed, and the limitation written next to the number.",
    ],
  },
  trabalho: {
    secao: "02 · work",
    titulo: ["Things I ", "built", "."],
    chamada: "Open any of them: the problem, the decision I made, and a piece of the code.",
    blocos: {
      ia: {
        titulo: "AI in production",
        nota: "Strongest first. The six quantitative projects have their own page, where the assumption behind each number becomes a control you can move.",
      },
      parceria: {
        titulo: "Partnerships and outreach",
        nota: "Built with clients outside the university: SEDECON, Bauru's economic development agency, and undergraduate research at Saruê, UNESP's business incubator.",
      },
    },
    acervo: "backend, product and coursework",
    verDemo: "Run the interactive demo",
    fechar: "Close",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["I pick the ", "tool", " for the problem."],
    nota: "I wrote the retrieval and the guards by hand, with no orchestration framework, which is why I can tell you where each one breaks. Python for data, Java for what has to survive the system on the other end going down.",
    grupos: {
      "ia aplicada": "applied AI",
      avaliacao: "evaluation",
      "dados e modelo": "data and models",
      metodo: "method",
      eixo: "core",
      mensageria: "messaging",
      dados: "data",
      infra: "infra",
      front: "front-end",
      "também uso": "also use",
    },
  },
  contato: {
    secao: "04 · contact",
    titulo: ["Need AI that", "does not make things up", "?"],
    chamada: "RAG, guarded agents and models in production, with the backend that holds them up. I reply within one business day.",
    email: "Email",
  },
  rodape: {
    lab: "/lab · IDE in the browser",
    labTitulo: "An experiment: this portfolio as an IDE in the browser",
    codigo: "source of this site",
  },
};

const es: Textos = {
  htmlLang: "es",
  nav: {
    sobre: "Sobre mí",
    trabalho: "Proyectos",
    stack: "Stack",
    contato: "Contacto",
    resultados: "Resultados →",
    menu: "Menú",
    fechar: "Cerrar",
    topo: "Inicio",
    abrirMenu: "Abrir menú",
    trocarIdioma: "Cambiar idioma",
  },
  hero: {
    disponivel: "disponible",
    verTrabalho: "Ver proyectos",
    conversar: "Hablemos",
  },
  sobre: {
    secao: "01 · sobre mí",
    titulo: ["IA que ", "funciona", " en producción."],
    cargo: "AI Engineer",
    cidade: "Bauru, Brasil",
    formacao: "Ciencias de la Computación, UNISAGRADO",
    formacaoValor: "Ciencias de la Computación, UNISAGRADO",
    rotuloCargo: "Puesto",
    rotuloCidade: "Ubicación",
    rotuloFormacao: "Formación",
    bio: "IA que se puede auditar: respuesta con la fuente citada, negativa cuando la fuente no existe, y números calculados por el dominio en vez de escritos por el modelo.",
    longBio: [
      "Tengo 21 años, estudio Ciencias de la Computación en UNISAGRADO y trabajo en integración y automatización de procesos en Digihub, del grupo Lecom. Trece clientes, de seguros al poder judicial.",
      "Construyo IA pensando en qué pasa cuando el modelo se equivoca. En PermaneIA el RAG está escrito a mano y responde con la fuente o dice que no sabe. En Balcão el modelo conversa, pero el precio lo calcula el dominio, y un auditor rechaza cualquier cifra sin origen. En CodeReview AI el modelo corre en casa, detrás de una cola.",
      "La otra mitad es cuantitativa, y responde cómo se validó el número. Lastro, mi trabajo final, prueba el método contra estructuras conocidas antes de tocar datos reales. Así encontré un defecto de mi propio algoritmo.",
      "Un modelo en el cuaderno no resuelve nada. Por eso API detrás de cola, contenedores, integración continua que frena la entrega, deriva medida en vez de supuesta, y el límite escrito junto al número.",
    ],
  },
  trabalho: {
    secao: "02 · proyectos",
    titulo: ["Cosas que ", "construí", "."],
    chamada: "Abrí cualquiera: el problema, la decisión que tomé y un fragmento de código.",
    blocos: {
      ia: {
        titulo: "IA en producción",
        nota: "Del más fuerte al más débil. Los seis proyectos cuantitativos tienen página propia, con la hipótesis convertida en control.",
      },
      parceria: {
        titulo: "Alianzas y extensión",
        nota: "Con clientes fuera de la universidad: la SEDECON, Secretaría de Desarrollo Económico de Bauru, e iniciación científica en Saruê, la incubadora de la UNESP.",
      },
    },
    acervo: "back-end, producto y universidad",
    verDemo: "Ejecutar la demo interactiva",
    fechar: "Cerrar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Elijo la ", "herramienta", " según el problema."],
    nota: "Escribí la recuperación y las barreras a mano, sin framework de orquestación, y por eso sé decir dónde falla cada una. Python para datos, Java para lo que tiene que sobrevivir a que el sistema del otro lado se caiga.",
    grupos: {
      "ia aplicada": "IA aplicada",
      avaliacao: "evaluación",
      "dados e modelo": "datos y modelos",
      metodo: "método",
      eixo: "eje",
      mensageria: "mensajería",
      dados: "datos",
      infra: "infra",
      front: "front",
      "também uso": "también uso",
    },
  },
  contato: {
    secao: "04 · contacto",
    titulo: ["¿Necesitás IA que", "no invente", "?"],
    chamada: "RAG, agentes con guardas y modelos en producción, con el back-end que los sostiene. Respondo en menos de 24 h hábiles.",
    email: "Correo",
  },
  rodape: {
    lab: "/lab · IDE en el navegador",
    labTitulo: "Un experimento: el portafolio como IDE en el navegador",
    codigo: "código de este sitio",
  },
};

export const DICIONARIO: Record<Idioma, Textos> = { pt, en, es };

export const IdiomaContext = createContext<{
  idioma: Idioma;
  trocar: (i: Idioma) => void;
}>({ idioma: IDIOMA_PADRAO, trocar: () => {} });

export function useIdioma() {
  return useContext(IdiomaContext);
}

/** Atalho para os textos do idioma corrente. */
export function useTextos(): Textos {
  return DICIONARIO[useIdioma().idioma];
}

export const CHAVE_ARMAZENAMENTO = "fj:idioma";

/**
 * Idioma inicial: português, a menos que a pessoa já tenha escolhido outro.
 *
 * Não há detecção pelo idioma do navegador de propósito. O site abre em
 * português para todo mundo, e quem quiser outro troca no seletor, que fica
 * visível no topo. Detectar pelo navegador entregaria a versão em inglês para
 * um brasileiro com o sistema em inglês, que é caso comum e vira a impressão
 * errada logo na primeira tela.
 *
 * A leitura vai dentro de try porque navegador em janela anônima, ou com dados
 * de site bloqueados, lança só de encostar no localStorage.
 */
export function idiomaInicial(): Idioma {
  try {
    const guardado = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (guardado === "pt" || guardado === "en" || guardado === "es") {
      return guardado;
    }
  } catch {
    // Sem armazenamento: abre em português, como qualquer primeira visita.
  }

  return IDIOMA_PADRAO;
}
