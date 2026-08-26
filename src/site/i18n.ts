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
      backend: { titulo: string; nota: string };
      produto: { titulo: string; nota: string };
      faculdade: { titulo: string; nota: string };
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
    titulo: ["Código que ", "funciona", " em produção."],
    cargo: "Desenvolvedor back-end",
    cidade: "Bauru, SP",
    formacao: "Ciência da Computação, UNISAGRADO",
    formacaoValor: "Ciência da Computação, UNISAGRADO",
    rotuloCargo: "Cargo",
    rotuloCidade: "Cidade",
    rotuloFormacao: "Formação",
    bio: "Back-end em Java, integração e automação de processo que já está em produção. Prefiro medir antes de mexer a corrigir no escuro.",
    longBio: [
      "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Atendo treze clientes de seguros, saúde, cooperativismo de crédito, auditoria e judiciário.",
      "Não começo sistema do zero. Mexo em processo de negócio vivo, com centenas de instâncias rodando na hora em que a alteração sobe: robô e integração em Java, regra de tela em JavaScript, roteamento e SQL de diagnóstico. Por isso reproduzo a regra atual e rodo contra o histórico real antes de mudar qualquer linha. Se o modelo não acerta o passado, não serve para prever o futuro.",
      "Nos projetos próprios o eixo é o mesmo. A Feira do Comando são três serviços Spring Boot conversando por Kafka, com outbox transacional e saga que compensa. O Outorga trata a licença de exibição como invariante: não existe caminho de código que publique sem ela. Os dois sobem PostgreSQL e Kafka de verdade nos testes, que foi como apareceram quatro defeitos que mock nenhum mostraria.",
    ],
  },
  trabalho: {
    secao: "02 · trabalho",
    titulo: ["Projetos que ", "construí", "."],
    chamada: "Clique em qualquer um: o problema, a decisão que tomei e um trecho de código.",
    blocos: {
      backend: {
        titulo: "Back-end",
        nota: "O eixo. Fila, evento, autenticação e banco, que é onde passo o dia.",
      },
      produto: {
        titulo: "Produto com usuário",
        nota: "Saíram de projeto pessoal e foram para cliente.",
      },
      faculdade: {
        titulo: "Faculdade e pesquisa",
        nota: "Trabalhos de disciplina na UNISAGRADO e a iniciação científica.",
      },
    },
    acervo: "projetos anteriores",
    verDemo: "Rodar a demo interativa",
    fechar: "Fechar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Escolho a ", "ferramenta", " pelo problema."],
    nota: "Não acredito em fanboy de stack. Java porque banco, Python porque ML, TypeScript porque toda a web vive nele.",
    grupos: {
      eixo: "eixo",
      back: "back",
      dados: "dados",
      mensageria: "mensageria",
      infra: "infra",
      "também uso": "também uso",
    },
  },
  contato: {
    secao: "04 · contato",
    titulo: ["Precisa de", "um back-end", "?"],
    chamada: "Java, Spring Boot e integração. Respondo em até 24h úteis.",
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
    titulo: ["Code that ", "holds up", " in production."],
    cargo: "Backend developer",
    cidade: "Bauru, Brazil",
    formacao: "Computer Science, UNISAGRADO",
    formacaoValor: "Computer Science, UNISAGRADO",
    rotuloCargo: "Role",
    rotuloCidade: "Based in",
    rotuloFormacao: "Studying",
    bio: "Java backend, integration and process automation already running in production. I would rather measure first than fix in the dark.",
    longBio: [
      "I am 21, studying Computer Science at UNISAGRADO, and I work on integration and process automation at Digihub, part of the Lecom group. I serve thirteen clients across insurance, healthcare, credit unions, auditing and the judiciary.",
      "I do not start systems from scratch. I change live business processes, with hundreds of instances running at the moment the change ships: Java integrations and robots, screen rules in JavaScript, process routing and diagnostic SQL. So I reproduce the current rule and run it against real history before changing a single line. If the model does not get the past right, it is no good at predicting the future.",
      "My own projects follow the same axis. Feira do Comando is three Spring Boot services talking over Kafka, with a transactional outbox and a saga that compensates. Outorga treats the broadcast licence as an invariant: no code path can publish without one. Both start a real PostgreSQL and a real Kafka in their tests, which is how four defects turned up that no mock would have shown.",
    ],
  },
  trabalho: {
    secao: "02 · work",
    titulo: ["Things I ", "built", "."],
    chamada: "Open any of them: the problem, the decision I made, and a piece of the code.",
    blocos: {
      backend: {
        titulo: "Backend",
        nota: "The axis. Queues, events, authentication and databases, which is where I spend the day.",
      },
      produto: {
        titulo: "Shipped to customers",
        nota: "These left the side-project stage and went to real clients.",
      },
      faculdade: {
        titulo: "University and research",
        nota: "Coursework at UNISAGRADO plus the undergraduate research project.",
      },
    },
    acervo: "earlier projects",
    verDemo: "Run the interactive demo",
    fechar: "Close",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["I pick the ", "tool", " for the problem."],
    nota: "I do not do stack fandom. Java because of the database, Python because of ML, TypeScript because the whole web lives there.",
    grupos: {
      eixo: "core",
      back: "backend",
      dados: "data",
      mensageria: "messaging",
      infra: "infra",
      "também uso": "also use",
    },
  },
  contato: {
    secao: "04 · contact",
    titulo: ["Need a", "backend engineer", "?"],
    chamada: "Java, Spring Boot and integration. I reply within one business day.",
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
    titulo: ["Código que ", "funciona", " en producción."],
    cargo: "Desarrollador back-end",
    cidade: "Bauru, Brasil",
    formacao: "Ciencias de la Computación, UNISAGRADO",
    formacaoValor: "Ciencias de la Computación, UNISAGRADO",
    rotuloCargo: "Puesto",
    rotuloCidade: "Ubicación",
    rotuloFormacao: "Formación",
    bio: "Back-end en Java, integración y automatización de procesos ya en producción. Prefiero medir antes de tocar que corregir a ciegas.",
    longBio: [
      "Tengo 21 años, estudio Ciencias de la Computación en UNISAGRADO y trabajo en integración y automatización de procesos en Digihub, del grupo Lecom. Atiendo a trece clientes de seguros, salud, cooperativas de crédito, auditoría y el poder judicial.",
      "No empiezo sistemas desde cero. Modifico procesos de negocio vivos, con cientos de instancias corriendo en el momento en que el cambio sale: integraciones y robots en Java, reglas de pantalla en JavaScript, ruteo de procesos y SQL de diagnóstico. Por eso reproduzco la regla actual y la corro contra el historial real antes de cambiar una sola línea. Si el modelo no acierta el pasado, no sirve para predecir el futuro.",
      "Mis proyectos propios siguen el mismo eje. Feira do Comando son tres servicios Spring Boot conversando por Kafka, con outbox transaccional y una saga que compensa. Outorga trata la licencia de exhibición como invariante: no existe camino de código capaz de publicar sin ella. Los dos levantan un PostgreSQL y un Kafka reales en las pruebas, que fue como aparecieron cuatro defectos que ningún mock habría mostrado.",
    ],
  },
  trabalho: {
    secao: "02 · proyectos",
    titulo: ["Cosas que ", "construí", "."],
    chamada: "Abrí cualquiera: el problema, la decisión que tomé y un fragmento de código.",
    blocos: {
      backend: {
        titulo: "Back-end",
        nota: "El eje. Colas, eventos, autenticación y base de datos, que es donde paso el día.",
      },
      produto: {
        titulo: "Producto con usuarios",
        nota: "Dejaron de ser proyecto personal y llegaron a clientes reales.",
      },
      faculdade: {
        titulo: "Universidad e investigación",
        nota: "Trabajos de cursada en UNISAGRADO y el proyecto de iniciación científica.",
      },
    },
    acervo: "proyectos anteriores",
    verDemo: "Ejecutar la demo interactiva",
    fechar: "Cerrar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Elijo la ", "herramienta", " según el problema."],
    nota: "No creo en el fanatismo por un stack. Java por la base de datos, Python por ML, TypeScript porque toda la web vive ahí.",
    grupos: {
      eixo: "eje",
      back: "back",
      dados: "datos",
      mensageria: "mensajería",
      infra: "infra",
      "também uso": "también uso",
    },
  },
  contato: {
    secao: "04 · contacto",
    titulo: ["¿Necesitás un", "back-end", "?"],
    chamada: "Java, Spring Boot e integración. Respondo en menos de 24 h hábiles.",
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
 * Idioma inicial: o que a pessoa escolheu antes, senão o do navegador, senão
 * português. A leitura vai dentro de try porque navegador em janela anônima ou
 * com dados de site bloqueados lança ao tocar em localStorage.
 */
export function idiomaInicial(): Idioma {
  try {
    const guardado = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (guardado === "pt" || guardado === "en" || guardado === "es") {
      return guardado;
    }
  } catch {
    // Sem armazenamento: segue para a detecção pelo navegador.
  }

  try {
    const doNavegador = navigator.language.slice(0, 2).toLowerCase();
    if (doNavegador === "en") return "en";
    if (doNavegador === "es") return "es";
  } catch {
    // Ambiente sem navigator, como a renderização em teste.
  }

  return IDIOMA_PADRAO;
}
