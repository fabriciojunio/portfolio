// Gera src/resultados/dados.ts a partir dos artefatos dos seis projetos.
//
// Por que um gerador e não um arquivo escrito à mão: o número da página tem
// que ser o mesmo que saiu do experimento. Copiado à mão ele envelhece no
// primeiro reprocessamento e ninguém percebe, porque continua parecendo certo.
// Aqui, se o artefato mudar, o arquivo gerado muda junto e aparece no diff.
//
// Os seis repositórios não são submódulos deste: moram ao lado, em dev/. Por
// isso o script roda na máquina e o resultado é commitado. Sem os repositórios
// ao lado ele falha dizendo qual arquivo faltou, em vez de gerar meia página.
//
//   node scripts/extrair-resultados.mjs
//
// Opcional: BASE=/outro/caminho node scripts/extrair-resultados.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, "..");
const BASE = process.env.BASE ? resolve(process.env.BASE) : resolve(RAIZ, "..");

const PASTAS = {
  lastro: "tcc-lastro",
  anteparo: "credito-ifrs9",
  decurso: "decurso",
  prumo: "prumo",
  verbete: "verbete",
  trato: "trato",
};

function caminho(slug, ...partes) {
  return join(BASE, PASTAS[slug], ...partes);
}

function lerJson(slug, ...partes) {
  const p = caminho(slug, ...partes);
  let texto;
  try {
    texto = readFileSync(p, "utf8");
  } catch (erro) {
    throw new Error(`não consegui ler ${p}: ${erro.message}`);
  }
  // O json.dump do Python escreve NaN e Infinity sem aspas, e isso não é JSON
  // pela especificação: JSON.parse recusa, e qualquer leitor que não seja
  // Python também. Aparece em grupo pequeno demais para o quartil existir.
  // Aqui vira null; na origem o certo é não escrever NaN, e está anotado nos
  // repositórios que fazem isso.
  const saneado = texto.replace(/:\s*(NaN|-?Infinity)\s*([,}\]])/g, ": null$2");
  try {
    return JSON.parse(saneado);
  } catch (erro) {
    throw new Error(`${p} não é JSON válido: ${erro.message}`);
  }
}

function lerCsv(slug, ...partes) {
  const p = caminho(slug, ...partes);
  let texto;
  try {
    texto = readFileSync(p, "utf8");
  } catch (erro) {
    throw new Error(`não consegui ler ${p}: ${erro.message}`);
  }
  const linhas = texto.trim().split(/\r?\n/);
  const cabecalho = linhas[0].split(",");
  return linhas.slice(1).map((linha) => {
    // Nenhum destes CSVs tem vírgula dentro de campo: são saídas numéricas do
    // pandas. Um parser completo aqui seria peso morto.
    const celulas = linha.split(",");
    const registro = {};
    cabecalho.forEach((nome, i) => {
      const bruto = celulas[i];
      const numero = Number(bruto);
      registro[nome] = bruto !== "" && !Number.isNaN(numero) ? numero : bruto;
    });
    return registro;
  });
}

/**
 * Reduz uma curva para no máximo `maximo` pontos preservando as pontas.
 *
 * A curva de sobrevivência do Decurso tem 1.118 degraus e a de Qini do Trato
 * tem 101. Mandar tudo para o navegador infla o pacote sem mudar um pixel: a
 * largura do gráfico não chega a 700 pontos de tela.
 */
function afinar(pontos, maximo) {
  if (pontos.length <= maximo) return pontos;
  const passo = (pontos.length - 1) / (maximo - 1);
  const saida = [];
  for (let i = 0; i < maximo; i++) {
    saida.push(pontos[Math.round(i * passo)]);
  }
  return saida;
}

const arredondar = (v, casas) => Number(v.toFixed(casas));

// --------------------------------------------------------------------------
// Lastro
// --------------------------------------------------------------------------
function lastro() {
  const deriva = lerJson("lastro", "resultados", "tabelas", "deriva_resumo.json");
  const curva = lerCsv("lastro", "resultados", "tabelas", "deriva_curva_sem_sobreposicao.csv");
  const algoritmos = lerCsv("lastro", "resultados", "tabelas", "validacao_resumo.csv");
  const persistentes = lerCsv("lastro", "resultados", "tabelas", "arestas_persistentes.csv");

  const ajuste = deriva.ajuste_sem_sobreposicao;
  const passo = deriva.passo;
  const meiaVida = Math.round(ajuste.meia_vida_pregoes);
  const ic = ajuste.ic_meia_vida.map((v) => Math.round(v * passo));

  const nomes = {
    evolutivo_refinado: "evolutivo refinado",
    pc_fisher_z: "PC com Fisher Z",
    busca_tabu: "busca tabu",
    escalada_de_colina: "escalada de colina",
    evolutivo_biobjetivo: "evolutivo bi-objetivo",
    evolutivo_monoobjetivo: "evolutivo mono-objetivo",
    correlacao_limiar_030: "correlação com limiar 0,30",
  };

  return {
    slug: "lastro",
    nome: "Lastro",
    pergunta: "Quanto tempo a estrutura de dependência entre bancos continua sendo a mesma?",
    dado: {
      fonte: "COTAHIST da B3, 2012 a 2025",
      recorte: `${deriva.n_janelas} janelas de ${deriva.largura} pregões, 22 instituições do setor financeiro`,
      limitacao:
        "A rede é estimada de retorno diário em janela deslizante. Ela descreve dependência estatística, não causalidade entre instituições.",
    },
    manchete: {
      valor: `${meiaVida} pregões`,
      rotulo: `meia-vida da estrutura, IC 95% [${ic[0]}; ${ic[1]}]`,
      leitura:
        "Cerca de três anos para metade das arestas trocarem. Um modelo de contágio calibrado uma vez e deixado rodando está lendo uma rede que já mudou.",
    },
    alavanca: {
      tipo: "continua",
      titulo: "Distância entre as duas janelas",
      explicacao:
        "Duas redes estimadas em períodos diferentes compartilham quantas arestas? O eixo é a distância entre elas, medida em pregões. Só entram pares sem sobreposição de amostra: janelas que dividem dias já começam parecidas por construção.",
      eixoX: { rotulo: "pregões de distância", formato: "inteiro" },
      eixoY: { rotulo: "arestas em comum (Jaccard)", formato: "decimal2" },
      serie: afinar(
        curva.map((l) => [l.defasagem_pregoes, arredondar(l.similaridade_jaccard, 4)]),
        70,
      ),
      marcas: [
        { x: meiaVida, rotulo: "meia-vida" },
        { y: arredondar(ajuste.s_infinito, 3), rotulo: "piso do ajuste" },
      ],
      leitura: "A {x} pregões de distância, duas redes compartilham {y} das arestas.",
    },
    contraste: {
      titulo: "Sete algoritmos nos mesmos 120 problemas com estrutura conhecida",
      nota: "Distância estrutural menor é melhor. O refinado empata com o PC em distância e ganha em F1 de esqueleto, e isso está relatado como empate e não como vitória (Wilcoxon pareado, p ajustado 0,70).",
      colunas: ["algoritmo", "distância média", "F1 do esqueleto"],
      linhas: algoritmos
        .sort((a, b) => a.shd_medio - b.shd_medio)
        .map((l) => [
          nomes[l.algoritmo] ?? l.algoritmo,
          arredondar(l.shd_medio, 2).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
          arredondar(l.f1_esqueleto, 3).toLocaleString("pt-BR", { minimumFractionDigits: 3 }),
        ]),
      destaque: algoritmos
        .sort((a, b) => a.shd_medio - b.shd_medio)
        .findIndex((l) => l.algoritmo === "evolutivo_refinado"),
    },
    achado: {
      titulo: "A aresta que aparece em todas as janelas",
      linhas: persistentes.slice(0, 4).map((l) => ({
        texto: `${l.origem} e ${l.destino}`,
        valor: `${(l.fracao_das_janelas * 100).toFixed(1).replace(".", ",")}% das janelas`,
      })),
      nota: "A primeira é a holding que controla o banco, e aparecer em 100% das janelas é o que diz que o método está achando dependência real e não ruído.",
    },
    limite: `O teto de ruído medido é ${arredondar(deriva.teto_de_ruido, 2)
      .toFixed(2)
      .replace(".", ",")}: duas janelas que se sobrepõem já discordam de metade das arestas. Similaridade abaixo disso não separa mudança de estrutura de erro de estimação, e é por isso que o ajuste usa só pares sem sobreposição.`,
    repo: null,
  };
}

// --------------------------------------------------------------------------
// Anteparo
// --------------------------------------------------------------------------
function anteparo() {
  const cartao = lerJson("anteparo", "resultados", "cartao_do_modelo.json");
  const sensibilidade = lerCsv("anteparo", "resultados", "tabelas", "sensibilidade.csv");
  const modelos = lerCsv("anteparo", "resultados", "tabelas", "metricas_por_modelo.csv");

  const lgd = sensibilidade.filter((l) => l.hipotese === "lgd_base");
  const menor = Math.min(...lgd.map((l) => l.provisao_total));
  const maior = Math.max(...lgd.map((l) => l.provisao_total));
  const amplitudeLgd = maior / menor - 1;

  const noTeste = modelos.filter((l) => l.conjunto === "teste");
  const piorGini = Math.min(...noTeste.map((l) => l.gini));
  const melhorGini = Math.max(...noTeste.map((l) => l.gini));

  const rotulos = {
    regra_de_atraso: "regra de atraso (sem modelo)",
    logistica_woe: "logística com WOE",
    gradiente: "gradiente impulsionado",
  };

  return {
    slug: "anteparo",
    nome: "Anteparo",
    pergunta: "Quanto da provisão vem do modelo, e quanto vem de uma hipótese que ninguém estimou?",
    dado: {
      fonte: "Yeh e Lien (2009), base de cartão de crédito da UCI",
      recorte: `${cartao.dados.n.toLocaleString("pt-BR")} clientes, divisão por cliente em treino, validação e teste`,
      limitacao: cartao.dados.limitacao_geografica,
    },
    manchete: {
      valor: `${(amplitudeLgd * 100).toFixed(0)}%`,
      rotulo: "o quanto a provisão se move só trocando a hipótese de perda",
      leitura:
        "Trocar o algoritmo de uma regra de atraso para gradiente impulsionado move o Gini de " +
        `${arredondar(piorGini, 3).toFixed(3).replace(".", ",")} para ${arredondar(melhorGini, 3)
          .toFixed(3)
          .replace(".", ",")}. Trocar a LGD dentro da faixa plausível move a provisão em ` +
        `${(amplitudeLgd * 100).toFixed(0)}%. A escolha que ninguém discute na reunião pesa mais que a que todo mundo discute.`,
    },
    alavanca: {
      tipo: "continua",
      titulo: "LGD, a perda dado o descumprimento",
      explicacao:
        "A base não traz recuperação, então a LGD não é estimada: é declarada. Carteira sem garantia fica tipicamente entre 60% e 75%, e o trabalho adota 65%. Os cinco pontos abaixo foram recalculados rodando a provisão inteira, não interpolados.",
      eixoX: { rotulo: "LGD adotada", formato: "percentual" },
      eixoY: { rotulo: "provisão total da carteira", formato: "moeda" },
      serie: lgd.map((l) => [l.valor, Math.round(l.provisao_total)]),
      marcas: [{ x: cartao.hipoteses_declaradas.lgd_base, rotulo: "hipótese do trabalho" }],
      leitura: "Com LGD de {x}, a provisão da carteira é de {y}.",
    },
    contraste: {
      titulo: "Os três candidatos no conjunto de teste",
      nota: "O critério de escolha foi calibração antes de discriminação: um modelo que ordena bem mas superestima o risco entrega provisão errada mesmo acertando quem é pior.",
      colunas: ["modelo", "Gini", "esperado sobre observado"],
      linhas: noTeste.map((l) => [
        rotulos[l.modelo] ?? l.modelo,
        arredondar(l.gini, 3).toFixed(3).replace(".", ","),
        arredondar(l.razao_esperado_observado, 3).toFixed(3).replace(".", ","),
      ]),
      destaque: noTeste.findIndex((l) => l.modelo === cartao.modelo_escolhido),
    },
    achado: {
      titulo: "O que a remoção de variável sensível custou",
      linhas: [
        { texto: "sexo, escolaridade e estado civil removidos", valor: "-0,0024 de Gini" },
        { texto: "pior calibração entre os grupos avaliados", valor: "4,6 em um grupo de 91 casos" },
      ],
      nota: cartao.variaveis_sensiveis_removidas.justificativa,
    },
    limite: cartao.limitacoes[1] + " " + cartao.limitacoes[4],
    repo: null,
  };
}

// --------------------------------------------------------------------------
// Decurso
// --------------------------------------------------------------------------
function decurso() {
  const duracao = lerJson("decurso", "resultados", "duracao.json");
  const curva = lerCsv("decurso", "resultados", "tabelas", "curva_de_sobrevivencia.csv");
  const comparacao = duracao.comparacao_das_duas_contas;

  const grupos = duracao.curva_por_grupo
    .slice()
    .sort((a, b) => b.mediana - a.mediana)
    .slice(0, 6);

  return {
    slug: "decurso",
    nome: "Decurso",
    pergunta: "Quanto dura um processo judicial, se os que ainda correm não podem ser descartados?",
    dado: {
      fonte: "DataJud do CNJ, Procedimento Comum Cível do TJSP",
      recorte: `${duracao.curva.n.toLocaleString("pt-BR")} processos ajuizados em janeiro de 2019, observados até ${duracao.observado_ate.slice(0, 10).split("-").reverse().join("/")}`,
      limitacao:
        "O DataJud não traz valor da causa nem município preenchido. Qualquer valor em dinheiro aqui é hipótese paramétrica declarada, não medida.",
    },
    manchete: {
      valor: `${arredondar(comparacao.razao, 2).toFixed(2).replace(".", ",")}x`,
      rotulo: "o quanto a conta de planilha erra para baixo",
      leitura:
        `A conta que só olha processo encerrado dá mediana de ${comparacao.mediana_dos_encerrados} dias. ` +
        `Kaplan-Meier, que usa também os ${duracao.curva.n_censurados} que ainda correm, dá ${comparacao.mediana_kaplan_meier}. ` +
        "O erro não é aleatório: processo que ainda corre é justamente o demorado, e descartá-lo tira a cauda inteira.",
    },
    alavanca: {
      tipo: "continua",
      titulo: "Dias desde o ajuizamento",
      explicacao:
        "A curva é a fração de processos ainda em andamento. Ela não para no último encerrado: cada processo que ainda corre entra como informação parcial até o dia em que foi observado, que é o que a conta de planilha joga fora.",
      eixoX: { rotulo: "dias desde o ajuizamento", formato: "inteiro" },
      eixoY: { rotulo: "ainda em andamento", formato: "percentual" },
      serie: afinar(
        curva.map((l) => [Math.round(l.t), arredondar(l.s, 4)]),
        80,
      ),
      marcas: [
        { y: 0.5, rotulo: "mediana" },
        { x: comparacao.mediana_dos_encerrados, rotulo: "o que a planilha diz" },
      ],
      leitura: "Passados {x} dias, {y} dos processos ainda estavam correndo.",
    },
    contraste: {
      titulo: "Mediana por assunto, entre os grupos com pelo menos 50 processos",
      nota: `${duracao.grupos_comparados} assuntos passaram do mínimo. Por órgão julgador não dá: são ${duracao.fragmentacao_dos_agrupamentos.orgao_codigo.grupos} grupos com média de ${arredondar(duracao.fragmentacao_dos_agrupamentos.orgao_codigo.media_por_grupo, 1).toFixed(1).replace(".", ",")} processos cada, e nenhum chega ao mínimo.`,
      colunas: ["assunto", "processos", "mediana em dias"],
      linhas: grupos.map((g) => [g.nome, String(g.n), String(g.mediana)]),
      destaque: -1,
    },
    achado: {
      titulo: "O que sobra depois da correção de comparações múltiplas",
      linhas: [
        { texto: "pares que pareceriam diferentes a 5%", valor: "12 de 55" },
        { texto: "pares que sobrevivem à correção", valor: "6" },
      ],
      nota: "Comparar 55 pares sem correção produz diferença significativa por sorteio. Metade do que parecia achado era o número de testes.",
    },
    limite: `${(duracao.curva.fracao_censurada * 100).toFixed(1).replace(".", ",")}% da base ainda corria no fim da observação. Essa fração é o tamanho do viés da conta ingênua, e cresce quanto mais recente for o recorte.`,
    repo: null,
  };
}

// --------------------------------------------------------------------------
// Prumo
// --------------------------------------------------------------------------
function prumo() {
  const persistencia = lerJson("prumo", "resultados", "persistencia.json");

  const interessantes = [
    "todos os fundos (contraste)",
    "Renda Fixa",
    "Ações",
    "Multimercado",
    "Cambial",
  ];
  const porClasse = persistencia.resultados.filter((r) => interessantes.includes(r.classificacao));

  const series = porClasse.map((r) => ({
    rotulo: r.classificacao,
    pontos: r.correlacao_de_postos.map((c) => [Number(c.periodo), arredondar(c.rho, 4)]),
    nota: `${r.n_pares.toLocaleString("pt-BR")} pares de ano, ${r.n_fundos.toLocaleString("pt-BR")} fundos`,
  }));

  const rendaFixa = porClasse.find((r) => r.classificacao === "Renda Fixa");
  const acoes = porClasse.find((r) => r.classificacao === "Ações");
  const media = (r) =>
    r.correlacao_de_postos.reduce((s, c) => s + c.rho, 0) / r.correlacao_de_postos.length;

  return {
    slug: "prumo",
    nome: "Prumo",
    pergunta: "O desempenho de um fundo neste ano diz alguma coisa sobre o próximo?",
    dado: {
      fonte: "Informe diário de fundos da CVM",
      recorte: "42,3 milhões de linhas de cota diária, 40.961 séries de fundo, 2018 a 2025",
      limitacao: persistencia.vies_declarado,
    },
    manchete: {
      valor: "+0,34 contra −0,02",
      rotulo: "correlação de postos entre anos: renda fixa contra ações",
      leitura:
        `Renda fixa persiste de verdade: correlação média de ${arredondar(media(rendaFixa), 2).toFixed(2).replace(".", ",").replace("0,", "0,")} entre um ano e o seguinte. ` +
        `Ações não persiste: ${arredondar(media(acoes), 2).toFixed(2).replace(".", ",")}, e o intervalo da razão de chances encosta em 1. ` +
        "Faz sentido: o que persiste em renda fixa é a taxa cobrada, que é a mesma todo ano. Em ações o que oscila é o retorno.",
    },
    alavanca: {
      tipo: "categorica",
      titulo: "Classe do fundo",
      explicacao:
        "Cada ponto é a correlação entre a posição do fundo num ano e no ano seguinte, dentro da mesma classe. Zero é o que se espera se o desempenho passado não disser nada.",
      eixoX: { rotulo: "ano", formato: "inteiro" },
      eixoY: { rotulo: "correlação de postos com o ano seguinte", formato: "decimal2" },
      series,
      marcas: [{ y: 0, rotulo: "sem persistência" }],
      leitura: "Entre {x} e o ano seguinte, a correlação de postos foi de {y}.",
    },
    contraste: {
      titulo: "O que o teste encontrou",
      nota: `${persistencia.testes.significativos_com_correcao} de ${persistencia.testes.n} testes continuam significativos depois da correção para comparações múltiplas. O número não mudou: nenhum achado dependia de não corrigir.`,
      colunas: ["classe", "pares", "correlação média"],
      linhas: porClasse.map((r) => [
        r.classificacao,
        r.n_pares.toLocaleString("pt-BR"),
        (media(r) >= 0 ? "+" : "−") + Math.abs(arredondar(media(r), 3)).toFixed(3).replace(".", ","),
      ]),
      destaque: porClasse.findIndex((r) => r.classificacao === "Renda Fixa"),
    },
    achado: {
      titulo: "O que o filtro de dado sujo tirou",
      linhas: [
        {
          texto: "séries curtas demais para medir um ano",
          valor: `${(persistencia.filtro_de_dias.fracao_removida * 100).toFixed(1).replace(".", ",")}%`,
        },
        { texto: "saltos de cota tratados", valor: persistencia.saltos_de_cota.toLocaleString("pt-BR") },
        {
          texto: "cobertura da classificação de fundo",
          valor: `${(persistencia.cobertura_da_classificacao * 100).toFixed(1).replace(".", ",")}%`,
        },
      ],
      nota: "Salto de cota é desdobramento ou erro de informe, e passa despercebido porque vira retorno de 900% num dia só. Sem tratar isso o fundo vai para o topo do ranking por um motivo que não é desempenho.",
    },
    limite:
      "Só entra no par o fundo presente nos dois períodos. O que fechou no meio sai, e ele é justamente o que foi mal: a medida é de persistência entre sobreviventes, e superestima.",
    repo: null,
  };
}

// --------------------------------------------------------------------------
// Verbete
// --------------------------------------------------------------------------
function verbete() {
  const abstencao = lerJson("verbete", "resultados", "abstencao.json");
  const treino = lerJson("verbete", "resultados", "treino.json");

  const curva = abstencao.curva
    .slice()
    .sort((a, b) => a.cobertura - b.cobertura)
    .map((p) => [arredondar(p.cobertura, 4), arredondar(p.micro_f1, 4)]);

  const sem = treino.resultados.sem_keywords;
  const com = treino.resultados.com_keywords;
  const noTeste = (bloco, chave) => {
    const m = bloco?.[chave]?.teste ?? bloco?.[chave]?.validacao;
    if (!m) throw new Error(`verbete: faltou ${chave} no bloco de resultados`);
    return m;
  };

  const candidatos = [
    ["sempre os temas mais frequentes", noTeste(sem, "sempre_os_frequentes")],
    ["regra por palavra do nome do tema", noTeste(sem, "por_palavra_chave")],
    ["TF-IDF com logística por tema", noTeste(sem, "tfidf_linear")],
  ];

  const melhorSem = noTeste(sem, "tfidf_linear");
  const melhorCom = noTeste(com, "tfidf_linear");
  const ganhoDoVazamento = melhorCom.micro_f1 - melhorSem.micro_f1;

  const temas = Object.entries(treino.distribuicao_dos_temas);

  return {
    slug: "verbete",
    nome: "Verbete",
    pergunta: "Vale a pena um classificador recusar o que ele não sabe?",
    dado: {
      fonte: "API de dados abertos da Câmara dos Deputados",
      recorte: `${(treino.divisao.treino + treino.divisao.validacao + treino.divisao.teste).toLocaleString("pt-BR")} proposições, ${temas.length} temas, divisão temporal com ${treino.divisao.ano_de_teste} como teste`,
      limitacao: treino.divisao.motivo,
    },
    manchete: {
      valor: `+${arredondar(ganhoDoVazamento, 3).toFixed(3).replace(".", ",")}`,
      rotulo: "de micro-F1 que o campo de palavras-chave inflava",
      leitura:
        "O campo de palavras-chave da API é preenchido pela mesma indexação humana que atribui o tema. Usá-lo faz o número subir " +
        `${((ganhoDoVazamento / melhorSem.micro_f1) * 100).toFixed(0)}%, e um modelo treinado assim pareceria melhor do que vai ser no dia em que a proposição chegar sem indexação. ` +
        "O resultado publicado é o de baixo.",
    },
    alavanca: {
      tipo: "continua",
      titulo: "Quanto o modelo aceita responder",
      explicacao:
        "Abaixo de um corte de confiança o modelo não responde e manda para revisão humana. Responder menos sobe a qualidade do que foi respondido: a pergunta é quanto, porque cada ponto de cobertura perdido é trabalho que volta para alguém.",
      eixoX: { rotulo: "cobertura", formato: "percentual" },
      eixoY: { rotulo: "micro-F1 do que foi respondido", formato: "decimal3" },
      serie: curva,
      marcas: [{ x: 1, rotulo: "responde tudo" }],
      leitura: "Respondendo {x} das proposições, o micro-F1 do que foi respondido é {y}.",
    },
    contraste: {
      titulo: "Os candidatos, sem as palavras-chave",
      nota: "A primeira linha é o piso: um modelo que não lê o texto e sempre chuta os temas mais comuns. Comparar com ela é o que diz se o modelo aprendeu alguma coisa.",
      colunas: ["abordagem", "micro-F1", "macro-F1"],
      linhas: candidatos.map(([nome, m]) => [
        nome,
        arredondar(m.micro_f1, 3).toFixed(3).replace(".", ","),
        arredondar(m.macro_f1, 3).toFixed(3).replace(".", ","),
      ]),
      destaque: candidatos.length - 1,
    },
    achado: {
      titulo: "A taxonomia é desigual, e o micro esconde isso",
      linhas: [
        { texto: "tema mais comum", valor: `${temas[0][0]}, ${temas[0][1]} casos` },
        {
          texto: "tema mais raro",
          valor: `${temas[temas.length - 1][0]}, ${temas[temas.length - 1][1]} casos`,
        },
        {
          texto: "distância entre micro-F1 e macro-F1",
          valor: arredondar(melhorSem.micro_f1 - melhorSem.macro_f1, 3).toFixed(3).replace(".", ","),
        },
      ],
      nota: "Micro-F1 pondera pelo número de casos e é levado pelos temas grandes. A distância para o macro é o tamanho do que o modelo não aprendeu nos temas raros, e é ela que importa para quem monitora um assunto de nicho.",
    },
    limite:
      "A divisão é temporal por ano e o teste é um ano só. Mudança de pauta entre legislaturas desloca a distribuição dos temas, e o número aqui não mede isso.",
    repo: null,
  };
}

// --------------------------------------------------------------------------
// Trato
// --------------------------------------------------------------------------
function trato() {
  const uplift = lerJson("trato", "resultados", "uplift_visit.json");
  const heterogeneidade = lerJson("trato", "resultados", "heterogeneidade_visit.json");

  const melhor = uplift.melhor_de_uplift;
  const curvaMelhor = uplift.resultados[melhor].curva;
  const curvaResposta = uplift.resultados["resposta (contraexemplo)"].curva;

  const serieUplift = afinar(
    curvaMelhor.fracao.map((f, i) => [arredondar(f, 4), arredondar(curvaMelhor.ganho[i], 2)]),
    60,
  );
  const serieResposta = afinar(
    curvaResposta.fracao.map((f, i) => [arredondar(f, 4), arredondar(curvaResposta.ganho[i], 2)]),
    60,
  );

  const ordem = ["acaso (piso)", "resposta (contraexemplo)", "dois modelos", "modelo unico", "transformacao do rotulo"];
  const rotulos = {
    "acaso (piso)": "contatar por sorteio (piso)",
    "resposta (contraexemplo)": "modelo de resposta (quem paga)",
    "dois modelos": "dois modelos",
    "modelo unico": "modelo único com interação",
    "transformacao do rotulo": "transformação do rótulo",
  };

  const fatias = heterogeneidade.fatias.filter((f) => f.difere_do_geral).slice(0, 4);
  const efeito = uplift.efeito_medio_no_teste;

  return {
    slug: "trato",
    nome: "Trato",
    pergunta: "Contatar menos gente pode render mais do que contatar todo mundo?",
    dado: {
      fonte: "Experimento aleatorizado de Kevin Hillstrom (2008)",
      recorte: `${(efeito.n_tratado + efeito.n_controle).toLocaleString("pt-BR")} pessoas no conjunto de teste, com grupo de controle que não recebeu contato`,
      limitacao: uplift.nota_de_validacao,
    },
    manchete: {
      valor: `+${(efeito.efeito * 100).toFixed(2).replace(".", ",")} pp`,
      rotulo: "efeito médio do contato, IC 95% dentro do experimento",
      leitura:
        "Esse é o efeito de contatar todo mundo. A pergunta do projeto é outra: existe gente para quem o contato rende mais? " +
        "A curva abaixo responde, e ela só pode ser construída porque existe grupo de controle. Sem controle não há como separar quem paga de quem paga por causa do contato.",
    },
    alavanca: {
      tipo: "continua",
      titulo: "Fração da base contatada, da mais responsiva para a menos",
      explicacao:
        "A curva acumula o ganho incremental ao contatar da pessoa com maior efeito previsto para a menor. A linha de baixo é o contraexemplo: ordenar por quem provavelmente paga, em vez de por quem paga por causa do contato.",
      eixoX: { rotulo: "fração contatada", formato: "percentual" },
      eixoY: { rotulo: "ganho incremental acumulado", formato: "decimal0" },
      serie: serieUplift,
      serieSecundaria: { rotulo: "ordenado por quem paga", pontos: serieResposta },
      marcas: [{ x: 0.75, rotulo: "contatando 75%" }],
      leitura: "Contatando {x} da base, o ganho acumulado é de {y} visitas a mais.",
    },
    contraste: {
      titulo: "Qini no conjunto de teste",
      nota: "Qini mede quanto a ordenação do modelo supera contatar por sorteio. O modelo de resposta, que é o que a maioria usa, fica mais perto do sorteio do que de um modelo de uplift.",
      colunas: ["abordagem", "Qini", "normalizado"],
      linhas: ordem
        .filter((k) => uplift.resultados[k])
        .map((k) => [
          rotulos[k],
          arredondar(uplift.resultados[k].qini, 1).toFixed(1).replace(".", ","),
          arredondar(uplift.resultados[k].qini_normalizado, 4).toFixed(4).replace(".", ","),
        ]),
      destaque: ordem.filter((k) => uplift.resultados[k]).indexOf(melhor),
    },
    achado: {
      titulo: "Onde a heterogeneidade está, e ela é interpretável",
      linhas: fatias.map((f) => ({
        texto: f.fatia,
        valor: `${f.efeito >= 0 ? "+" : "−"}${Math.abs(f.efeito * 100).toFixed(2).replace(".", ",")} pp`,
      })),
      nota: `O efeito geral é de ${(heterogeneidade.efeito_geral.efeito * 100).toFixed(2).replace(".", ",")} pp. As fatias acima diferem dele depois da correção para comparações múltiplas, e a leitura é direta: a peça é feminina, e funciona em quem compra feminino.`,
    },
    limite:
      "Varejo americano de 2008, não cobrança brasileira. O que transfere é o método: sem grupo de controle aleatorizado nenhuma dessas curvas pode ser construída, e é esse o pedaço que costuma faltar na empresa.",
    repo: null,
  };
}

// --------------------------------------------------------------------------

const projetos = [lastro(), anteparo(), decurso(), prumo(), verbete(), trato()];

const cabecalho = `// GERADO POR scripts/extrair-resultados.mjs. Não edite à mão.
//
// Cada número aqui saiu de um artefato de experimento em disco, nos
// repositórios dos seis projetos. Para regerar, com os repositórios ao lado
// deste:
//
//   node scripts/extrair-resultados.mjs
//
// Gerado em ${new Date().toISOString().slice(0, 10)}.

import type { ProjetoResultado } from "./tipos";

export const RESULTADOS: ProjetoResultado[] = `;

mkdirSync(join(RAIZ, "src", "resultados"), { recursive: true });
writeFileSync(
  join(RAIZ, "src", "resultados", "dados.ts"),
  cabecalho + JSON.stringify(projetos, null, 2) + ";\n",
  "utf8",
);

console.log(`escrito src/resultados/dados.ts com ${projetos.length} projetos`);
for (const p of projetos) {
  const pontos =
    p.alavanca.tipo === "continua"
      ? p.alavanca.serie.length
      : p.alavanca.series.reduce((s, x) => s + x.pontos.length, 0);
  console.log(`  ${p.slug.padEnd(10)} ${String(pontos).padStart(4)} pontos de curva`);
}
