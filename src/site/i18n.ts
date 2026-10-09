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
    card: Record<"what" | "role" | "highlights" | "flow" | "demo" | "github" | "ide" | "demoBadge" | "simulationBadge" | "access", string>;
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
  "htmlLang": "pt-BR",
  "nav": {
    "sobre": "Sobre",
    "trabalho": "Trabalho",
    "stack": "Stack",
    "contato": "Contato",
    "resultados": "IDE →",
    "menu": "Menu",
    "fechar": "Fechar",
    "topo": "Topo",
    "abrirMenu": "Abrir menu",
    "trocarIdioma": "Trocar idioma"
  },
  "hero": {
    "disponivel": "DIGIHUB Tecnologia",
    "verTrabalho": "Ver trabalho",
    "conversar": "Conversar"
  },
  "sobre": {
    "secao": "01 · sobre",
    "titulo": [
      "Desenvolvimento, ",
      "integrações",
      " e sustentação."
    ],
    "cargo": "Analista de Sistemas",
    "cidade": "Bauru, SP",
    "formacao": "Ciência da Computação, UNISAGRADO",
    "formacaoValor": "Ciência da Computação, UNISAGRADO",
    "rotuloCargo": "Cargo",
    "rotuloCidade": "Cidade",
    "rotuloFormacao": "Formação",
    "bio": "Desenvolvimento, integrações e sustentação de software. Java, JavaScript e SQL no trabalho; PHP, Symfony e Laravel em projetos próprios.",
    "longBio": [
      "Sou Analista de Sistemas na DIGIHUB Tecnologia. Trabalho com robôs Java, integrações REST, regras JavaScript, SQL e processos na Lecom BPM, com automação RPA no Roberty Studio.",
      "Analiso chamados, investigo código e banco de dados, implemento correções e acompanho a homologação e a publicação. Utilizo Jira, Git e GitLab no acompanhamento das entregas.",
      "Na Nexum Tecnologia, atuei em processos do setor financeiro, integrações com APIs externas e MCP. Em projetos próprios, desenvolvo também com PHP, Symfony e Laravel, com testes e integração contínua.",
      "Curso Ciência da Computação na UNISAGRADO. Participo de iniciação científica em saúde pública com o ConectAgente, selecionado pela incubadora Saruê da UNESP Bauru. IA e processamento de imagens fazem parte dos meus estudos e projetos acadêmicos."
    ]
  },
  "trabalho": {
    "secao": "02 · trabalho",
    "titulo": [
      "Projetos que ",
      "desenvolvi",
      "."
    ],
    "chamada": "Explore o problema, minha participação e o roteiro de visualização. Demonstrações e simulações têm seu escopo indicado.",
    "blocos": {
      "ia": {
        "titulo": "Desenvolvimento e integrações",
        "nota": "Projetos próprios e extensão com código, testes e fluxos documentados."
      },
      "parceria": {
        "titulo": "Pesquisa aplicada",
        "nota": "Iniciação científica em saúde pública, com desenvolvimento mobile e web."
      }
    },
    "acervo": "Outros projetos e trabalhos acadêmicos",
    "verDemo": "Abrir simulação na IDE",
    "fechar": "Fechar",
    "card": {
      "what": "o que é",
      "role": "minha participação",
      "highlights": "destaques",
      "flow": "como visualizar",
      "demo": "abrir demonstração",
      "github": "código no GitHub",
      "ide": "explorar código na IDE",
      "demoBadge": "demonstração",
      "simulationBadge": "simulação",
      "access": "acesso de demonstração"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "Escolho a ",
      "ferramenta",
      " pelo problema."
    ],
    "nota": "Uso profissional e projetos próprios indicados em grupos separados. IA e processamento de sinais fazem parte da pesquisa.",
    "grupos": {
      "trabalho": "atuação profissional",
      "integracoes": "integrações e ferramentas",
      "backend": "back-end em projetos",
      "interface": "interfaces em projetos",
      "dados": "dados em projetos",
      "qualidade": "qualidade e infraestrutura",
      "pesquisa": "pesquisa acadêmica"
    }
  },
  "contato": {
    "secao": "04 · contato",
    "titulo": [
      "Vamos falar sobre",
      "software e integrações",
      "?"
    ],
    "chamada": "Entre em contato para conversar sobre desenvolvimento, integrações e sustentação de software.",
    "email": "E-mail"
  },
  "rodape": {
    "lab": "/lab · IDE no browser",
    "labTitulo": "Experimento: o portfólio como IDE no browser",
    "codigo": "código deste site"
  }
};

const en: Textos = {
  "htmlLang": "en",
  "nav": {
    "sobre": "About",
    "trabalho": "Work",
    "stack": "Stack",
    "contato": "Contact",
    "resultados": "IDE →",
    "menu": "Menu",
    "fechar": "Close",
    "topo": "Top",
    "abrirMenu": "Open menu",
    "trocarIdioma": "Change language"
  },
  "hero": {
    "disponivel": "DIGIHUB Tecnologia",
    "verTrabalho": "See the work",
    "conversar": "Get in touch"
  },
  "sobre": {
    "secao": "01 · about",
    "titulo": [
      "Development, ",
      "integrations",
      " and software support."
    ],
    "cargo": "Systems Analyst",
    "cidade": "Bauru, Brazil",
    "formacao": "Computer Science, UNISAGRADO",
    "formacaoValor": "Computer Science, UNISAGRADO",
    "rotuloCargo": "Role",
    "rotuloCidade": "Based in",
    "rotuloFormacao": "Studying",
    "bio": "Software development, integrations and support. Java, JavaScript and SQL at work; PHP, Symfony and Laravel in personal projects.",
    "longBio": [
      "I am a Systems Analyst at DIGIHUB Tecnologia, working with Java automation, REST integrations, JavaScript rules, SQL and Lecom BPM processes, with RPA in Roberty Studio.",
      "I investigate support requests, code and databases, implement fixes and follow testing and releases. I use Jira, Git and GitLab to track delivery.",
      "At Nexum Tecnologia, I worked on financial workflows, external API integrations and MCP. My personal projects also use PHP, Symfony and Laravel, with automated tests and continuous integration.",
      "I study Computer Science at UNISAGRADO. My undergraduate public health research project, ConectAgente, was selected by Saruê, the UNESP Bauru incubator. AI and image processing are part of my studies and academic projects."
    ]
  },
  "trabalho": {
    "secao": "02 · work",
    "titulo": [
      "Projects I ",
      "developed",
      "."
    ],
    "chamada": "Explore each problem, my contribution and the viewing steps. Demos and simulations state their scope.",
    "blocos": {
      "ia": {
        "titulo": "Development and integrations",
        "nota": "Personal and outreach projects with code, tests and documented workflows."
      },
      "parceria": {
        "titulo": "Applied research",
        "nota": "Undergraduate public health research with mobile and web development."
      }
    },
    "acervo": "More projects and coursework",
    "verDemo": "Open simulation in the IDE",
    "fechar": "Close",
    "card": {
      "what": "overview",
      "role": "my contribution",
      "highlights": "highlights",
      "flow": "how to explore",
      "demo": "open demo",
      "github": "source on GitHub",
      "ide": "explore code in the IDE",
      "demoBadge": "demo",
      "simulationBadge": "simulation",
      "access": "demo access"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "I pick the ",
      "tool",
      " for the problem."
    ],
    "nota": "Professional tools and personal project technologies are listed separately. AI and signal processing belong to research.",
    "grupos": {
      "trabalho": "professional work",
      "integracoes": "integrations and tools",
      "backend": "project backends",
      "interface": "project interfaces",
      "dados": "project data",
      "qualidade": "quality and infrastructure",
      "pesquisa": "academic research"
    }
  },
  "contato": {
    "secao": "04 · contact",
    "titulo": [
      "Let’s talk about",
      "software and integrations",
      "."
    ],
    "chamada": "Get in touch about software development, integrations and support.",
    "email": "Email"
  },
  "rodape": {
    "lab": "/lab · IDE in the browser",
    "labTitulo": "An experiment: this portfolio as an IDE in the browser",
    "codigo": "source of this site"
  }
};

const es: Textos = {
  "htmlLang": "es",
  "nav": {
    "sobre": "Sobre mí",
    "trabalho": "Proyectos",
    "stack": "Stack",
    "contato": "Contacto",
    "resultados": "IDE →",
    "menu": "Menú",
    "fechar": "Cerrar",
    "topo": "Inicio",
    "abrirMenu": "Abrir menú",
    "trocarIdioma": "Cambiar idioma"
  },
  "hero": {
    "disponivel": "DIGIHUB Tecnologia",
    "verTrabalho": "Ver proyectos",
    "conversar": "Hablemos"
  },
  "sobre": {
    "secao": "01 · sobre mí",
    "titulo": [
      "Desarrollo, ",
      "integraciones",
      " y soporte de software."
    ],
    "cargo": "Analista de Sistemas",
    "cidade": "Bauru, Brasil",
    "formacao": "Ciencias de la Computación, UNISAGRADO",
    "formacaoValor": "Ciencias de la Computación, UNISAGRADO",
    "rotuloCargo": "Puesto",
    "rotuloCidade": "Ubicación",
    "rotuloFormacao": "Formación",
    "bio": "Desarrollo, integraciones y soporte de software. Java, JavaScript y SQL en el trabajo; PHP, Symfony y Laravel en proyectos propios.",
    "longBio": [
      "Soy Analista de Sistemas en DIGIHUB Tecnologia. Trabajo con automatización Java, integraciones REST, reglas JavaScript, SQL y procesos Lecom BPM, con RPA en Roberty Studio.",
      "Investigo solicitudes de soporte, código y bases de datos, implemento correcciones y acompaño las pruebas y publicaciones. Utilizo Jira, Git y GitLab para seguir las entregas.",
      "En Nexum Tecnologia trabajé con procesos financieros, integraciones de API y MCP. En proyectos propios también desarrollo con PHP, Symfony y Laravel, con pruebas e integración continua.",
      "Estudio Ciencias de la Computación en UNISAGRADO. ConectAgente, mi proyecto de investigación en salud pública, fue seleccionado por la incubadora Saruê de UNESP Bauru. IA y procesamiento de imágenes forman parte de mis estudios y proyectos académicos."
    ]
  },
  "trabalho": {
    "secao": "02 · proyectos",
    "titulo": [
      "Proyectos que ",
      "desarrollé",
      "."
    ],
    "chamada": "Explore el problema, mi participación y los pasos de visualización. Las demostraciones y simulaciones indican su alcance.",
    "blocos": {
      "ia": {
        "titulo": "Desarrollo e integraciones",
        "nota": "Proyectos propios y de extensión con código, pruebas y procesos documentados."
      },
      "parceria": {
        "titulo": "Investigación aplicada",
        "nota": "Investigación universitaria en salud pública con desarrollo móvil y web."
      }
    },
    "acervo": "Otros proyectos y trabajos académicos",
    "verDemo": "Abrir simulación en la IDE",
    "fechar": "Cerrar",
    "card": {
      "what": "descripción",
      "role": "mi participación",
      "highlights": "aspectos destacados",
      "flow": "cómo explorar",
      "demo": "abrir demostración",
      "github": "código en GitHub",
      "ide": "explorar código en la IDE",
      "demoBadge": "demostración",
      "simulationBadge": "simulación",
      "access": "acceso de demostración"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "Elijo la ",
      "herramienta",
      " según el problema."
    ],
    "nota": "Las herramientas profesionales y las tecnologías de proyectos propios aparecen en grupos separados. IA y señales forman parte de la investigación.",
    "grupos": {
      "trabalho": "trabajo profesional",
      "integracoes": "integraciones y herramientas",
      "backend": "back-end en proyectos",
      "interface": "interfaces en proyectos",
      "dados": "datos en proyectos",
      "qualidade": "calidad e infraestructura",
      "pesquisa": "investigación académica"
    }
  },
  "contato": {
    "secao": "04 · contacto",
    "titulo": [
      "Hablemos de",
      "software e integraciones",
      "."
    ],
    "chamada": "Contácteme para conversar sobre desarrollo, integraciones y soporte de software.",
    "email": "Correo"
  },
  "rodape": {
    "lab": "/lab · IDE en el navegador",
    "labTitulo": "Un experimento: el portafolio como IDE en el navegador",
    "codigo": "código de este sitio"
  }
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
