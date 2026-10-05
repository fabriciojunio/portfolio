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
    bio: "Modelo de risco e de decisão que chega em produção com o número defendido: linha de base antes do modelo, validação temporal honesta e o limite declarado junto com o resultado.",
    longBio: [
      "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Treze clientes, de seguros a judiciário.",
      "Meus seis projetos resolvem o problema que a área de risco resolve: perda esperada de crédito sob IFRS 9, provisão de contingência judicial sob CPC 25, persistência de desempenho de fundo, classificação de texto regulatório e efeito incremental de contato medido com grupo de controle.",
      "O trabalho de conclusão aprende a estrutura de dependência entre instituições financeiras da B3 e mede quanto tempo ela dura. Provo o método contra estrutura conhecida antes de encostar no dado real, e foi assim que achei um defeito do meu próprio algoritmo.",
      "Em todos: linha de base sem modelo em pé de igualdade, divisão temporal, calibração antes de discriminação, correção para comparações múltiplas e resultado negativo relatado como resultado. Em IA generativa, resposta com a fonte citada, recusa medida e número calculado fora do modelo.",
    ],
  },
  trabalho: {
    secao: "02 · trabalho",
    titulo: ["Projetos que ", "construí", "."],
    chamada: "Clique em qualquer um: o problema, a decisão que tomei e um trecho de código.",
    blocos: {
      ia: {
        titulo: "IA em produção",
        nota: "Risco, crédito, provisão, texto regulatório e efeito causal. Os seis têm página própria, onde a hipótese por trás do número vira um controle que dá para mexer.",
      },
      parceria: {
        titulo: "Parceria e extensão",
        nota: "Com gente fora da sala de aula: a SEDECON, Secretaria de Desenvolvimento Econômico de Bauru, e iniciação científica que passou pela Saruê, a incubadora da UNESP.",
      },
    },
    acervo: "back-end, produto e faculdade",
    verDemo: "Rodar a demo interativa",
    fechar: "Fechar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Escolho a ", "ferramenta", " pelo problema."],
    nota: "A primeira lista é a que importa numa revisão de modelo: o que separa quem treina de quem entrega número que passa pela validação. Python para o modelo, Java para o que precisa aguentar o sistema do outro lado cair.",
    grupos: {
      "risco e validacao": "risco e validação",
      modelo: "modelo",
      "ia generativa": "IA generativa",
      producao: "produção",
      dados: "dados",
      infra: "infra",
      front: "front",
    },
  },
  contato: {
    secao: "04 · contato",
    titulo: ["Precisa de", "modelo que passe na validação", "?"],
    chamada: "Risco, crédito, provisão e texto regulatório, com o número defendido e o limite declarado. Respondo em até 24h úteis.",
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
    bio: "Risk and decision models that reach production with the number defended: a baseline before the model, honest temporal validation, and the limitation declared next to the result.",
    longBio: [
      "I am 21, studying Computer Science at UNISAGRADO, and I work on integration and process automation at Digihub, part of the Lecom group. Thirteen clients, from insurance to the judiciary.",
      "My six projects solve what a risk function solves: expected credit loss under IFRS 9, legal contingency provisioning under IAS 37, performance persistence in investment funds, regulatory text classification, and incremental treatment effect measured against a control group.",
      "My final-year project learns the dependency structure between B3 financial institutions and measures how long it lasts. I prove the method against known structures before touching real data, which is how I found a defect in my own algorithm.",
      "In all of them: a no-model baseline on equal footing, temporal splits, calibration before discrimination, correction for multiple comparisons, and negative results reported as results. In generative AI: answers with the source cited, a measured refusal, and arithmetic kept outside the model.",
    ],
  },
  trabalho: {
    secao: "02 · work",
    titulo: ["Things I ", "built", "."],
    chamada: "Open any of them: the problem, the decision I made, and a piece of the code.",
    blocos: {
      ia: {
        titulo: "AI in production",
        nota: "Risk, credit, provisioning, regulatory text and causal effect. All six have their own page, where the assumption behind each number becomes a control you can move.",
      },
      parceria: {
        titulo: "Partnerships and outreach",
        nota: "Built with people outside the classroom: SEDECON, Bauru's economic development agency, and undergraduate research that went through Saruê, UNESP's business incubator.",
      },
    },
    acervo: "backend, product and coursework",
    verDemo: "Run the interactive demo",
    fechar: "Close",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["I pick the ", "tool", " for the problem."],
    nota: "The first list is the one that matters in a model review: it separates people who train models from people who ship a number that survives validation. Python for the model, Java for what has to survive the system on the other end going down.",
    grupos: {
      "risco e validacao": "risk and validation",
      modelo: "models",
      "ia generativa": "generative AI",
      producao: "production",
      dados: "data",
      infra: "infra",
      front: "front-end",
    },
  },
  contato: {
    secao: "04 · contact",
    titulo: ["Need a model that", "survives validation", "?"],
    chamada: "Risk, credit, provisioning and regulatory text, with the number defended and the limitation declared. I reply within one business day.",
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
    bio: "Modelos de riesgo y de decisión que llegan a producción con el número defendido: línea de base antes del modelo, validación temporal honesta y el límite declarado junto al resultado.",
    longBio: [
      "Tengo 21 años, estudio Ciencias de la Computación en UNISAGRADO y trabajo en integración y automatización de procesos en Digihub, del grupo Lecom. Trece clientes, de seguros al poder judicial.",
      "Mis seis proyectos resuelven lo que resuelve un área de riesgo: pérdida esperada de crédito bajo IFRS 9, provisión de contingencia judicial bajo la IAS 37, persistencia de desempeño de fondos, clasificación de texto regulatorio y efecto incremental de contacto medido contra un grupo de control.",
      "Mi trabajo final aprende la estructura de dependencia entre instituciones financieras de la B3 y mide cuánto dura. Pruebo el método contra estructuras conocidas antes de tocar datos reales, y así encontré un defecto de mi propio algoritmo.",
      "En todos: línea de base sin modelo en igualdad de condiciones, división temporal, calibración antes que discriminación, corrección para comparaciones múltiples y resultado negativo informado como resultado. En IA generativa: respuesta con la fuente citada, negativa medida y aritmética fuera del modelo.",
    ],
  },
  trabalho: {
    secao: "02 · proyectos",
    titulo: ["Cosas que ", "construí", "."],
    chamada: "Abrí cualquiera: el problema, la decisión que tomé y un fragmento de código.",
    blocos: {
      ia: {
        titulo: "IA en producción",
        nota: "Riesgo, crédito, provisión, texto regulatorio y efecto causal. Los seis tienen página propia, donde la hipótesis detrás del número se vuelve un control que se puede mover.",
      },
      parceria: {
        titulo: "Alianzas y extensión",
        nota: "Con gente fuera del aula: la SEDECON, Secretaría de Desarrollo Económico de Bauru, e iniciación científica que pasó por Saruê, la incubadora de la UNESP.",
      },
    },
    acervo: "back-end, producto y universidad",
    verDemo: "Ejecutar la demo interactiva",
    fechar: "Cerrar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Elijo la ", "herramienta", " según el problema."],
    nota: "La primera lista es la que importa en una revisión de modelo: separa a quien entrena de quien entrega un número que pasa la validación. Python para el modelo, Java para lo que tiene que sobrevivir a que el sistema del otro lado se caiga.",
    grupos: {
      "risco e validacao": "riesgo y validación",
      modelo: "modelos",
      "ia generativa": "IA generativa",
      producao: "producción",
      dados: "datos",
      infra: "infra",
      front: "front",
    },
  },
  contato: {
    secao: "04 · contacto",
    titulo: ["¿Necesitás un modelo que", "pase la validación", "?"],
    chamada: "Riesgo, crédito, provisión y texto regulatorio, con el número defendido y el límite declarado. Respondo en menos de 24 h hábiles.",
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
