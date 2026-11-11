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
      destaque: { titulo: string; nota: string };
      seguranca: { titulo: string; nota: string };
      ia: { titulo: string; nota: string };
    };
    acervo: string;
    verDemo: string;
    fechar: string;
    card: Record<"what" | "role" | "highlights" | "security" | "flow" | "demo" | "github" | "ide" | "presentation" | "demoBadge" | "simulationBadge" | "access", string>;
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
    "trabalho": "Projetos",
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
    "disponivel": "Aberto a vagas de AppSec",
    "verTrabalho": "Ver projetos",
    "conversar": "Conversar"
  },
  "sobre": {
    "secao": "01 · sobre",
    "titulo": [
      "Segurança de aplicações ",
      "com base",
      " de desenvolvedor."
    ],
    "cargo": "Segurança de Aplicações · AppSec",
    "cidade": "Bauru, SP",
    "formacao": "Ciência da Computação, UNISAGRADO",
    "formacaoValor": "Ciência da Computação, UNISAGRADO",
    "rotuloCargo": "Foco",
    "rotuloCidade": "Cidade",
    "rotuloFormacao": "Formação",
    "bio": "Segurança de aplicações com base de desenvolvedor. Modelo ameaças, reviso código, coloco SAST, DAST e SCA na esteira e testo o que construo.",
    "longBio": [
      "Analista de Sistemas na DIGIHUB Tecnologia. Entrego robôs Java, integrações REST, JavaScript e SQL na Lecom BPM e reviso a segurança de cada entrega: onde fica o token, como a entrada é validada e quem acessa o quê.",
      "Nos projetos, faço o dia a dia de AppSec: threat modeling, revisão de código, SAST, DAST e SCA nas pipelines, pentest com relatório e a tradução do risco para quem vai corrigir.",
      "Trabalho com IA dos dois lados: ataco e defendo agentes com RAG e MCP pelo OWASP Top 10 para LLM, e uso modelo local para triar achados no pull request.",
      "Ciência da Computação na UNISAGRADO (2027). Iniciação científica com o ConectAgente, selecionado pela Saruê (UNESP Bauru), e formação CiberEducação da Cisco com o SENAI."
    ]
  },
  "trabalho": {
    "secao": "02 · projetos",
    "titulo": [
      "Sistemas que ",
      "construí",
      " e protegi."
    ],
    "chamada": "Cada projeto mostra o problema, o que eu fiz e a segurança aplicada, com evidência no repositório.",
    "blocos": {
      "destaque": {
        "titulo": "Destaques",
        "nota": "Extensão com a Prefeitura de Bauru, iniciação científica, TCC e NASA Space Apps."
      },
      "seguranca": {
        "titulo": "Segurança de aplicações",
        "nota": "Identidade, esteira DevSecOps, pentest, modelo seguro por padrão, triagem de vulnerabilidades e segurança de IA."
      },
      "ia": {
        "titulo": "IA aplicada",
        "nota": "Agentes, RAG e modelos medidos, com regra em código para o que não pode errar."
      }
    },
    "acervo": "Outros projetos e trabalhos acadêmicos",
    "verDemo": "Abrir simulação na IDE",
    "fechar": "Fechar",
    "card": {
      "what": "o que é",
      "role": "o que eu fiz",
      "highlights": "resultados",
      "security": "segurança aplicada",
      "flow": "como conferir",
      "demo": "abrir demonstração",
      "github": "código no GitHub",
      "ide": "explorar código na IDE",
      "presentation": "ler apresentação na IDE",
      "demoBadge": "demonstração",
      "simulationBadge": "simulação",
      "access": "acesso de demonstração"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "O que ",
      "uso",
      " no dia a dia."
    ],
    "nota": "Ferramentas gratuitas no lugar das pagas (Semgrep e CodeQL no lugar do Checkmarx, ZAP e Burp Community no lugar do Burp Pro), com o mesmo conceito.",
    "grupos": {
      "appsec": "segurança de aplicações",
      "ferramentas": "ferramentas",
      "identidade": "identidade e acesso",
      "nuvem": "nuvem e cadeia de suprimentos",
      "ia": "segurança de IA",
      "privacidade": "privacidade e governança",
      "backend": "desenvolvimento",
      "trabalho": "no trabalho (DIGIHUB)"
    }
  },
  "contato": {
    "secao": "04 · contato",
    "titulo": [
      "Vamos falar sobre",
      "segurança de aplicações",
      "?"
    ],
    "chamada": "Aberto a vagas de AppSec e Product Security, remotas ou em Bauru.",
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
    "trabalho": "Projects",
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
    "disponivel": "Open to AppSec roles",
    "verTrabalho": "See projects",
    "conversar": "Get in touch"
  },
  "sobre": {
    "secao": "01 · about",
    "titulo": [
      "Application security ",
      "with a",
      " developer’s background."
    ],
    "cargo": "Application Security · AppSec",
    "cidade": "Bauru, Brazil",
    "formacao": "Computer Science, UNISAGRADO",
    "formacaoValor": "Computer Science, UNISAGRADO",
    "rotuloCargo": "Focus",
    "rotuloCidade": "Based in",
    "rotuloFormacao": "Studying",
    "bio": "Application security with a developer’s background. I threat model, review code, put SAST, DAST and SCA in the pipeline and test what I build.",
    "longBio": [
      "Systems Analyst at DIGIHUB Tecnologia. I ship Java bots, REST integrations, JavaScript and SQL on Lecom BPM, and review the security of each delivery: where the token lives, how input is validated and who can access what.",
      "In my projects I do the day-to-day of AppSec: threat modeling, code review, SAST, DAST and SCA in pipelines, pentests with a report, and translating risk for whoever has to fix it.",
      "I work with AI on both sides: I attack and defend agents with RAG and MCP against the OWASP Top 10 for LLM, and use a local model to triage findings on pull requests.",
      "Computer Science at UNISAGRADO (2027). Undergraduate research on ConectAgente, selected by Saruê (UNESP Bauru), and Cisco’s CiberEducação programme with SENAI."
    ]
  },
  "trabalho": {
    "secao": "02 · projects",
    "titulo": [
      "Systems I ",
      "built",
      " and secured."
    ],
    "chamada": "Each project shows the problem, what I did and the security applied, with evidence in the repository.",
    "blocos": {
      "destaque": {
        "titulo": "Highlights",
        "nota": "Outreach with the City of Bauru, undergraduate research, thesis and NASA Space Apps."
      },
      "seguranca": {
        "titulo": "Application security",
        "nota": "Identity, DevSecOps pipeline, pentest, secure-by-default template, vulnerability triage and AI security."
      },
      "ia": {
        "titulo": "Applied AI",
        "nota": "Agents, RAG and measured models, with rules in code for what cannot go wrong."
      }
    },
    "acervo": "More projects and coursework",
    "verDemo": "Open simulation in the IDE",
    "fechar": "Close",
    "card": {
      "what": "overview",
      "role": "what I did",
      "highlights": "results",
      "security": "security applied",
      "flow": "how to check",
      "demo": "open demo",
      "github": "source on GitHub",
      "ide": "explore code in the IDE",
      "presentation": "read presentation in the IDE",
      "demoBadge": "demo",
      "simulationBadge": "simulation",
      "access": "demo access"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "What I ",
      "use",
      " day to day."
    ],
    "nota": "Free tools instead of paid ones (Semgrep and CodeQL instead of Checkmarx, ZAP and Burp Community instead of Burp Pro), same concepts.",
    "grupos": {
      "appsec": "application security",
      "ferramentas": "tools",
      "identidade": "identity and access",
      "nuvem": "cloud and supply chain",
      "ia": "AI security",
      "privacidade": "privacy and governance",
      "backend": "development",
      "trabalho": "at work (DIGIHUB)"
    }
  },
  "contato": {
    "secao": "04 · contact",
    "titulo": [
      "Let’s talk about",
      "application security",
      "."
    ],
    "chamada": "Open to AppSec and Product Security roles, remote or in Bauru.",
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
    "disponivel": "Abierto a puestos de AppSec",
    "verTrabalho": "Ver proyectos",
    "conversar": "Hablemos"
  },
  "sobre": {
    "secao": "01 · sobre mí",
    "titulo": [
      "Seguridad de aplicaciones ",
      "con base",
      " de desarrollador."
    ],
    "cargo": "Seguridad de Aplicaciones · AppSec",
    "cidade": "Bauru, Brasil",
    "formacao": "Ciencias de la Computación, UNISAGRADO",
    "formacaoValor": "Ciencias de la Computación, UNISAGRADO",
    "rotuloCargo": "Enfoque",
    "rotuloCidade": "Ubicación",
    "rotuloFormacao": "Formación",
    "bio": "Seguridad de aplicaciones con base de desarrollador. Modelo amenazas, reviso código, pongo SAST, DAST y SCA en el pipeline y pruebo lo que construyo.",
    "longBio": [
      "Analista de Sistemas en DIGIHUB Tecnologia. Entrego bots Java, integraciones REST, JavaScript y SQL en Lecom BPM y reviso la seguridad de cada entrega: dónde queda el token, cómo se valida la entrada y quién accede a qué.",
      "En mis proyectos hago el día a día de AppSec: modelado de amenazas, revisión de código, SAST, DAST y SCA en los pipelines, pentest con informe y la traducción del riesgo para quien tiene que corregir.",
      "Trabajo con IA de los dos lados: ataco y defiendo agentes con RAG y MCP según el OWASP Top 10 para LLM, y uso un modelo local para clasificar hallazgos en el pull request.",
      "Ciencias de la Computación en UNISAGRADO (2027). Investigación con ConectAgente, seleccionado por Saruê (UNESP Bauru), y formación CiberEducação de Cisco con el SENAI."
    ]
  },
  "trabalho": {
    "secao": "02 · proyectos",
    "titulo": [
      "Sistemas que ",
      "construí",
      " y protegí."
    ],
    "chamada": "Cada proyecto muestra el problema, lo que hice y la seguridad aplicada, con evidencia en el repositorio.",
    "blocos": {
      "destaque": {
        "titulo": "Destacados",
        "nota": "Extensión con la Municipalidad de Bauru, investigación, tesis y NASA Space Apps."
      },
      "seguranca": {
        "titulo": "Seguridad de aplicaciones",
        "nota": "Identidad, pipeline DevSecOps, pentest, plantilla segura por defecto, triage de vulnerabilidades y seguridad de IA."
      },
      "ia": {
        "titulo": "IA aplicada",
        "nota": "Agentes, RAG y modelos medidos, con reglas en código para lo que no puede fallar."
      }
    },
    "acervo": "Otros proyectos y trabajos académicos",
    "verDemo": "Abrir simulación en la IDE",
    "fechar": "Cerrar",
    "card": {
      "what": "descripción",
      "role": "lo que hice",
      "highlights": "resultados",
      "security": "seguridad aplicada",
      "flow": "cómo verificar",
      "demo": "abrir demostración",
      "github": "código en GitHub",
      "ide": "explorar código en la IDE",
      "presentation": "leer presentación en la IDE",
      "demoBadge": "demostración",
      "simulationBadge": "simulación",
      "access": "acceso de demostración"
    }
  },
  "stack": {
    "secao": "03 · stack",
    "titulo": [
      "Lo que ",
      "uso",
      " en el día a día."
    ],
    "nota": "Herramientas gratuitas en lugar de las pagas (Semgrep y CodeQL en lugar de Checkmarx, ZAP y Burp Community en lugar de Burp Pro), con el mismo concepto.",
    "grupos": {
      "appsec": "seguridad de aplicaciones",
      "ferramentas": "herramientas",
      "identidade": "identidad y acceso",
      "nuvem": "nube y cadena de suministro",
      "ia": "seguridad de IA",
      "privacidade": "privacidad y gobierno",
      "backend": "desarrollo",
      "trabalho": "en el trabajo (DIGIHUB)"
    }
  },
  "contato": {
    "secao": "04 · contacto",
    "titulo": [
      "Hablemos de",
      "seguridad de aplicaciones",
      "."
    ],
    "chamada": "Abierto a puestos de AppSec y Product Security, remotos o en Bauru.",
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
