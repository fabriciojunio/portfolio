/**
 * O formato dos dados que `scripts/extrair-resultados.mjs` escreve.
 *
 * Os seis projetos respondem perguntas diferentes, mas têm a mesma anatomia: um
 * número que resume, uma hipótese da qual esse número depende, uma comparação
 * contra alternativas e um limite declarado. Esse é o contrato aqui.
 */

export type Formato =
  | "moeda"
  | "inteiro"
  | "decimal0"
  | "decimal2"
  | "decimal3"
  | "decimal4"
  | "percentual";

export interface Eixo {
  rotulo: string;
  formato: Formato;
}

/** Linha de referência no gráfico. Vertical quando tem `x`, horizontal com `y`. */
export interface Marca {
  x?: number;
  y?: number;
  rotulo: string;
}

export type Ponto = [number, number];

interface AlavancaComum {
  titulo: string;
  explicacao: string;
  eixoX: Eixo;
  eixoY: Eixo;
  marcas: Marca[];
  /** Frase com {x} e {y}, preenchida com o ponto onde a pessoa parou. */
  leitura: string;
}

export interface AlavancaContinua extends AlavancaComum {
  tipo: "continua";
  serie: Ponto[];
  serieSecundaria?: { rotulo: string; pontos: Ponto[] };
}

export interface AlavancaCategorica extends AlavancaComum {
  tipo: "categorica";
  series: { rotulo: string; pontos: Ponto[]; nota: string }[];
}

export type Alavanca = AlavancaContinua | AlavancaCategorica;

export interface ProjetoResultado {
  slug: string;
  nome: string;
  pergunta: string;
  dado: {
    fonte: string;
    recorte: string;
    limitacao: string;
  };
  manchete: {
    valor: string;
    rotulo: string;
    leitura: string;
  };
  alavanca: Alavanca;
  contraste: {
    titulo: string;
    nota: string;
    colunas: string[];
    linhas: string[][];
    /** Índice da linha a destacar, ou -1 quando nenhuma se destaca. */
    destaque: number;
  };
  achado: {
    titulo: string;
    linhas: { texto: string; valor: string }[];
    nota: string;
  };
  limite: string;
  repo: string | null;
}
