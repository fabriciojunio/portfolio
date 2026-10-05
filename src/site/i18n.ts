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
    bio: "Construo sistemas com modelo de linguagem que podem ser auditados: resposta com a fonte, recusa quando a fonte não existe e número calculado pelo domínio, nunca escrito pelo modelo.",
    longBio: [
      "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Atendo treze clientes de seguros, saúde, cooperativismo de crédito, auditoria e judiciário, e é lá que aprendi a mexer em sistema que já tem gente dentro.",
      "O que eu construo com IA parte de uma pergunta prática: o que acontece quando o modelo erra. Na PermaneIA escrevi a camada de RAG inteira, sem framework de orquestração, com busca híbrida, limiar de relevância e as barreiras contra injeção de prompt. Ela responde com a fonte citada ou diz que não sabe, em vez de arriscar a data de uma prova. No Balcão o modelo escolhe a estratégia da conversa, mas preço, parcela e valor de troca saem de função determinística, e um auditor reprova qualquer algarismo sem origem registrada. No CodeReview AI o modelo roda dentro de casa, atrás de fila com reprocessamento e cache por hash, porque código de cliente não sai da rede.",
      "A outra metade é quantitativa, e é ela que sustenta a conversa quando perguntam como o número foi validado. O Lastro, meu trabalho de conclusão, aprende a estrutura de dependência entre instituições financeiras da B3 em vez de recortá-la de uma matriz de correlação, e prova o método contra estruturas conhecidas antes de encostar no dado real. Foi essa fase que pegou um defeito do meu próprio algoritmo que o dado de mercado jamais denunciaria. A regra é a mesma dos dois lados: baseline antes do modelo sofisticado, divisão temporal honesta, e o limite do que foi medido escrito junto com o número.",
    ],
  },
  trabalho: {
    secao: "02 · trabalho",
    titulo: ["Projetos que ", "construí", "."],
    chamada: "Clique em qualquer um: o problema, a decisão que tomei e um trecho de código.",
    blocos: {
      ia: {
        titulo: "IA em produção",
        nota: "O eixo. Primeiro o que usa modelo de linguagem com a fonte citada, a recusa escrita e o número fora do modelo. Depois a parte quantitativa, onde o resultado precisa ser defendido e não só treinado.",
      },
      parceria: {
        titulo: "Parceria e extensão",
        nota: "Com cliente fora da faculdade: a SEDECON, Secretaria de Desenvolvimento Econômico de Bauru, e iniciação científica com coleta em campo.",
      },
    },
    acervo: "back-end, produto e faculdade",
    verDemo: "Rodar a demo interativa",
    fechar: "Fechar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Escolho a ", "ferramenta", " pelo problema."],
    nota: "Escrevi o RAG, o roteamento e as barreiras à mão em vez de montar sobre framework de orquestração, e é por isso que sei dizer onde cada um falha. Python quando o problema é dado, Java quando precisa aguentar o sistema do outro lado cair, TypeScript porque a tela precisa existir.",
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
    chamada: "RAG, agente com guarda e modelo rodando em produção, com o back-end que sustenta isso. Respondo em até 24h úteis.",
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
    titulo: ["AI that ", "holds up", " in production."],
    cargo: "AI Engineer",
    cidade: "Bauru, Brazil",
    formacao: "Computer Science, UNISAGRADO",
    formacaoValor: "Computer Science, UNISAGRADO",
    rotuloCargo: "Role",
    rotuloCidade: "Based in",
    rotuloFormacao: "Studying",
    bio: "I build LLM systems you can audit: answers that cite the source, a refusal when the source is missing, and numbers computed by the domain, never written by the model.",
    longBio: [
      "I am 21, studying Computer Science at UNISAGRADO, and I work on integration and process automation at Digihub, part of the Lecom group. I serve thirteen clients across insurance, healthcare, credit unions, auditing and the judiciary, which is where I learned to work on systems that already have people inside them.",
      "What I build with AI starts from a practical question: what happens when the model is wrong. In PermaneIA I wrote the whole RAG layer by hand, with no orchestration framework: hybrid retrieval, a relevance threshold, and the guards against prompt injection. It answers with the source cited or says it does not know, instead of guessing an exam date. In Balcão the model picks the strategy of the conversation, but price, instalments and trade-in value come out of deterministic functions, and an auditor rejects any digit without a recorded origin. In CodeReview AI the model runs on our own machines, behind a queue with reprocessing and a hash-keyed cache, because client code does not leave the network.",
      "The other half is quantitative, and it is what carries the conversation when someone asks how the number was validated. Lastro, my final-year project, learns the dependency structure between B3 financial institutions instead of cutting it out of a correlation matrix, and proves the method against known structures before touching real data. That phase caught a defect in my own algorithm that market data would never have revealed. The rule is the same on both sides: baseline before the fancy model, honest temporal splits, and the limitation written next to the number.",
    ],
  },
  trabalho: {
    secao: "02 · work",
    titulo: ["Things I ", "built", "."],
    chamada: "Open any of them: the problem, the decision I made, and a piece of the code.",
    blocos: {
      ia: {
        titulo: "AI in production",
        nota: "The axis. First the LLM work, with the source cited, the refusal written down and the arithmetic kept outside the model. Then the quantitative half, where a result has to be defended and not just trained.",
      },
      parceria: {
        titulo: "Partnerships and outreach",
        nota: "Built with clients outside the university: SEDECON, Bauru's economic development agency, and undergraduate research collecting data in the field.",
      },
    },
    acervo: "backend, product and coursework",
    verDemo: "Run the interactive demo",
    fechar: "Close",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["I pick the ", "tool", " for the problem."],
    nota: "I wrote the retrieval, the routing and the guards by hand rather than stacking them on an orchestration framework, which is why I can tell you where each one breaks. Python when the problem is data, Java when it has to survive the system on the other end going down, TypeScript because the screen has to exist.",
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
    chamada: "RAG, guarded agents and models running in production, with the backend that holds them up. I reply within one business day.",
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
    titulo: ["IA que ", "funciona", " en producción."],
    cargo: "AI Engineer",
    cidade: "Bauru, Brasil",
    formacao: "Ciencias de la Computación, UNISAGRADO",
    formacaoValor: "Ciencias de la Computación, UNISAGRADO",
    rotuloCargo: "Puesto",
    rotuloCidade: "Ubicación",
    rotuloFormacao: "Formación",
    bio: "Construyo sistemas con modelos de lenguaje que se pueden auditar: respuesta con la fuente citada, negativa cuando la fuente no existe y números calculados por el dominio, nunca escritos por el modelo.",
    longBio: [
      "Tengo 21 años, estudio Ciencias de la Computación en UNISAGRADO y trabajo en integración y automatización de procesos en Digihub, del grupo Lecom. Atiendo a trece clientes de seguros, salud, cooperativas de crédito, auditoría y el poder judicial, y ahí aprendí a tocar sistemas que ya tienen gente adentro.",
      "Lo que construyo con IA parte de una pregunta práctica: qué pasa cuando el modelo se equivoca. En PermaneIA escribí toda la capa de RAG a mano, sin framework de orquestación, con búsqueda híbrida, umbral de relevancia y las barreras contra inyección de prompt. Responde con la fuente citada o dice que no sabe, en lugar de arriesgar la fecha de un examen. En Balcão el modelo elige la estrategia de la conversación, pero precio, cuotas y valor de permuta salen de funciones determinísticas, y un auditor rechaza cualquier cifra sin origen registrado. En CodeReview AI el modelo corre en casa, detrás de una cola con reprocesamiento y caché por hash, porque el código del cliente no sale de la red.",
      "La otra mitad es cuantitativa, y es la que sostiene la conversación cuando preguntan cómo se validó el número. Lastro, mi trabajo final, aprende la estructura de dependencia entre instituciones financieras de la B3 en lugar de recortarla de una matriz de correlación, y prueba el método contra estructuras conocidas antes de tocar datos reales. Esa fase encontró un defecto de mi propio algoritmo que el dato de mercado nunca habría delatado. La regla es la misma de los dos lados: baseline antes del modelo complejo, división temporal honesta y el límite escrito junto al número.",
    ],
  },
  trabalho: {
    secao: "02 · proyectos",
    titulo: ["Cosas que ", "construí", "."],
    chamada: "Abrí cualquiera: el problema, la decisión que tomé y un fragmento de código.",
    blocos: {
      ia: {
        titulo: "IA en producción",
        nota: "El eje. Primero lo que usa modelos de lenguaje, con la fuente citada, la negativa escrita y la aritmética fuera del modelo. Después la mitad cuantitativa, donde el resultado tiene que defenderse y no solo entrenarse.",
      },
      parceria: {
        titulo: "Alianzas y extensión",
        nota: "Con clientes fuera de la universidad: la SEDECON, Secretaría de Desarrollo Económico de Bauru, e iniciación científica con recolección en campo.",
      },
    },
    acervo: "back-end, producto y universidad",
    verDemo: "Ejecutar la demo interactiva",
    fechar: "Cerrar",
  },
  stack: {
    secao: "03 · stack",
    titulo: ["Elijo la ", "herramienta", " según el problema."],
    nota: "Escribí la recuperación, el ruteo y las barreras a mano en vez de montarlas sobre un framework de orquestación, y por eso sé decir dónde falla cada una. Python cuando el problema son los datos, Java cuando tiene que sobrevivir a que el sistema del otro lado se caiga, TypeScript porque la pantalla tiene que existir.",
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
