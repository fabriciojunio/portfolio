// Dados reais dos projetos, escritos pra leitura humana.
// Sem badges de cor por linguagem, sem métricas inventadas.

export interface SiteProject {
  slug: string;
  name: string;
  oneLine: string;
  what: string;
  role: string;
  highlights?: string[];
  stack: string[];
  github: string | null; // null = repositório privado (sem link público)
  demo?: string | null;
  /**
   * Como entrar na demo, quando ela tem tela de login.
   *
   * Quem abre o link e esbarra num formulário de senha fecha a aba. O acesso é
   * de um ambiente de demonstração, com dados de mentira e nada real atrás, e
   * por isso pode ficar à vista.
   */
  demoAcesso?: string;
  /**
   * Caminho do arquivo na IDE que tem demo interativa, quando existe.
   *
   * A demo mora em /lab, e sem um link daqui ela ficava escondida atrás de
   * abrir a IDE, achar o arquivo na árvore e reparar no botão Run. Este campo
   * é o que permite chegar nela direto do card do projeto.
   */
  labDemo?: string;
  year: string;
  snippet: string;
  snippetLang: "typescript" | "python" | "java" | "php" | "csharp" | "sql";
}

const PROJECTS_SOURCE: SiteProject[] = [
  {
    slug: "lastro",
    name: "Lastro",
    oneLine: "Rede de dependência entre bancos aprendida por algoritmo evolutivo",
    what: "Trabalho de conclusão de curso. Aprende, a partir dos retornos diários da B3, a estrutura de dependência entre as instituições financeiras listadas, e mede quanto tempo essa estrutura dura. A rede não é desenhada à mão nem recortada de uma matriz de correlação: ela é aprendida como rede bayesiana gaussiana, com a busca feita por um algoritmo evolutivo multiobjetivo que devolve a fronteira inteira entre ajuste e número de arestas.",
    role: "Escrevi o sistema todo: leitor do layout COTAHIST da B3, detecção e auditoria de evento corporativo, a verossimilhança gaussiana calculada pela matriz de covariância com cache, o NSGA-II sobre a codificação por ordenação, as três referências de comparação, o bootstrap em blocos e a análise estatística.",
    highlights: [
      "A fase que prova o método vem antes da que o aplica: primeiro em redes cuja estrutura é conhecida, com Friedman, Wilcoxon pareado e correção de Benjamini-Hochberg; só depois no dado real, sem reajustar nenhum parâmetro",
      "Essa fase pegou um defeito que o dado real jamais denunciaria: a primeira versão do aprendiz perdia da escalada de colina, e a diferença crescia com o tamanho do problema. O espaço da máscara tem 435 bits em 30 vértices, e a evolução gastava o orçamento procurando o que, dada a ordem, pode ser calculado",
      "Com a máscara calculada em vez de evoluída, o aprendiz passou ao primeiro posto médio entre sete algoritmos nas mesmas 840 execuções. Ganha da busca tabu e da escalada de colina com tamanho de efeito alto, e empata com o PC, o que está relatado como empate e não como vitória",
      "O teto da codificação está medido em separado: com a ordem topológica verdadeira o erro estrutural cai para 7,07, contra 40,38 de uma ordem sorteada. A ordem é a parte difícil, e não é adivinhável, porque ordenar por variância marginal fica em 12,25",
      "O grafo de correlação com limiar, que é como boa parte da literatura financeira monta rede, entra como contraexemplo e é medido: dois terços das arestas que ele cria não existem",
      "Comparação em CPDAG, não em DAG: dois grafos com o mesmo esqueleto e os mesmos colisores são indistinguíveis a partir de dado observacional, e cobrar a direção seria cobrar o impossível",
      "Detector de desdobramento e grupamento com três critérios simultâneos, auditável: encontrou nove eventos em 14 anos, entre eles o 1:2 do Banco do Brasil em 2024 e o 1:4 do BTG em 2021",
      "A curva de deriva usa só pares de janelas sem sobreposição, e a similaridade entre reamostragens da mesma janela entra como teto de ruído: sem esse número a meia-vida não tem leitura",
      "3.471 pregões de 2012 a 2025, 22 instituições, 154 janelas e 55 testes que verificam propriedade matemática, não implementação",
    ],
    stack: ["Python 3.12", "NumPy", "SciPy", "NetworkX", "pandas", "scikit-learn", "Matplotlib"],
    github: null,
    demo: "/resultados/lastro",
    year: "2026",
    snippetLang: "python",
    snippet: `# Fixada a ordem, os nós são independentes: a aciclicidade já
# está garantida e a pontuação é decomponível. Então a melhor
# máscara não se procura, se calcula nó por nó.
for pos in range(n):
    no = ordem[pos]
    candidatos = ordem[:pos]          # só os predecessores
    pais, trilha = melhores_pais_do_no(
        pontuador, no, candidatos, grau_max,
        penalidade_por_aresta=0.5 * log(N),   # <- o termo do BIC
    )                                  # sem ele, o guloso satura`,
  },
  {
    slug: "anteparo",
    name: "Anteparo",
    oneLine: "Provisão para perda esperada de crédito sob IFRS 9",
    what: "Calcula a provisão do jeito que a norma manda: PD, LGD e EAD, com classificação em estágios, sobreposição prospectiva e monitoramento. A conta é ECL = PD × LGD × EAD; o trabalho está em decidir qual PD entra nela, e em medir de quanto o modelo ganha de não ter modelo.",
    role: "Escrevi o domínio inteiro: a regra de transferência entre estágios, as métricas de discriminação e calibração, o PSI com faixas vindas da referência, as três medidas de equidade e a tabela de sensibilidade. O domínio opera sobre numpy e tipos próprios, sem conhecer arquivo nem biblioteca de modelo.",
    highlights: [
      "O resultado que importa não é do modelo: a provisão varia 1,45x só mudando a hipótese de LGD dentro da faixa declarada, bem mais do que a distância entre o melhor e o pior algoritmo de PD",
      "O critério de escolha não é o maior Gini, é o maior Gini entre os candidatos com erro de calibração dentro do dobro do melhor. Provisão usa a probabilidade como número, não como ordem",
      "A regra sem aprendizado de máquina entra na comparação em pé de igualdade, e o ganho sobre ela é de 1,51x em Gini. Sem esse número não dá para dizer que a complexidade se paga",
      "O estágio exige duas condições ao mesmo tempo, aumento relativo da PD e aumento absoluto: só a razão dispararia a carteira inteira quando a PD é baixa",
      "O achado de equidade que a média esconde: num grupo de 91 casos o modelo superestima o risco por um fator de quase cinco, com AUC pior que o acaso",
      "Tirar sexo, escolaridade e estado civil custa −0,0024 de Gini, ou seja, o modelo fica marginalmente melhor sem elas. Com custo zero, não existe argumento técnico para manter",
      "Base de Taiwan, declarada: não existe base pública brasileira de contrato a contrato com inadimplência rotulada, e usar dado real estrangeiro é melhor que inventar dado brasileiro",
    ],
    stack: ["Python 3.12", "NumPy", "pandas", "scikit-learn", "pytest"],
    github: "https://github.com/fabriciojunio/anteparo",
    demo: "/resultados/anteparo",
    year: "2026",
    snippetLang: "python",
    snippet: `# O estágio não é nível de risco, é AUMENTO desde a originação.
# Só a razão dispararia a carteira inteira quando a PD é baixa:
# sair de 0,1% para 0,3% é o triplo e não é aumento relevante.
subiu = (pd_atual / pd_originacao >= RAZAO_MINIMA) & (
    pd_atual - pd_originacao >= AUMENTO_ABSOLUTO_MINIMO
)
estagio = np.where(tem_perda, 3, np.where(subiu | atraso_30, 2, 1))`,
  },
  {
    slug: "decurso",
    name: "Decurso",
    oneLine: "Quanto um processo judicial dura, e quanto disso vira provisão",
    what: "Estima duração e desfecho de processo a partir da API pública do CNJ, e transforma as duas coisas em provisão pelo critério do CPC 25. O DataJud tem o insumo e não tem nenhuma das respostas prontas: não traz desfecho rotulado, não traz valor da causa e não traz duração, e as três precisam ser derivadas da lista de movimentos.",
    role: "Escrevi o coletor tolerante a falha, a derivação de desfecho com as três defesas contra vazamento, a análise de sobrevivência com Kaplan-Meier e log-rank, o modelo com linha de base e o cálculo de provisão. 126 testes, nenhum deles tocando a API.",
    highlights: [
      "A conta que sai de planilha, a média dos processos já encerrados, descarta 20,8% da base e erra para baixo por 1,21x: 791 dias contra 955 da mediana de Kaplan-Meier. O erro não é aleatório, e é maior justamente na vara mais lenta",
      "Comparando a duração entre assuntos, 73 dos 210 pares pareceriam diferentes a 5% e 44 sobrevivem à correção de Benjamini-Hochberg",
      "O modelo de desfecho dá resultado negativo e está relatado como tal: AUC de 0,521, sem diferença significativa nem contra a taxa global nem contra a taxa do órgão",
      "Um achado morreu quando a amostra cresceu, e isso ficou escrito: com 2.648 processos a taxa do órgão batia a taxa global com a diferença sobrevivendo à correção; com 4.118 ela não bate mais. É o que acontece com efeito pequeno em amostra pequena",
      "A hipótese de valor em risco move a provisão 4,00x contra 1,09x da escolha do modelo",
      "O comportamento da API foi medido, não presumido: ordenação devolve 504 em qualquer forma, o que inviabiliza search_after, e a contagem sem track_total_hits para em 10.000, fazendo uma consulta de 300 mil parecer de 10 mil",
      "A coleta divide o período até cada fatia caber e grava o que faltou, fatia por fatia: a desta base veio incompleta, 4.118 de 9.852, e isso está declarado em vez de invisível",
    ],
    stack: ["Python 3.12", "NumPy", "pandas", "scikit-learn", "SciPy", "Matplotlib"],
    github: "https://github.com/fabriciojunio/decurso",
    demo: "/resultados/decurso",
    year: "2026",
    snippetLang: "python",
    snippet: `# Ordenação devolve 504 nesta API, então search_after não serve.
# Sobra dividir o período até cada fatia caber na paginação rasa.
n = self.contar(indice, consulta)          # com track_total_hits
if n > limite_por_fatia and a < b:
    meio = a + (b - a) // 2
    pilha.append((meio + timedelta(days=1), b))
    pilha.append((a, meio))
    continue                               # e o que falhar fica declarado`,
  },
  {
    slug: "verbete",
    name: "Verbete",
    oneLine: "Projetos de lei classificados por tema, com a medida do vazamento",
    what: "Classifica proposição legislativa pelos 32 temas oficiais da Câmara, a partir da ementa. É o motor de um produto de monitoramento regulatório: saber, no dia em que a proposição é apresentada, quais clientes ela afeta. 4.500 projetos de lei de 2022 a 2024, com a taxonomia vinda da própria API.",
    role: "Escrevi o leitor da API com paginação e registro de falha, as métricas multirrótulo, os três candidatos, a curva de abstenção e a extração de explicação. 41 testes, nenhum deles chamando a API.",
    highlights: [
      "O resultado principal é o tamanho do vazamento de anotação: o campo de palavras-chave da API é preenchido pela mesma indexação humana que atribui o tema, e usá-lo faz o micro-F1 ir de 0,542 para 0,682. Um modelo que o usasse pareceria 26% melhor do que vai ser quando a proposição chegar sem indexação",
      "A divisão é temporal e não aleatória: proposição sobre o mesmo assunto reaparece a cada legislatura com ementa quase igual, e divisão aleatória poria a quase-cópia nos dois lados",
      "A distância entre micro e macro F1 é o resultado, não um detalhe: ela mede o quanto o modelo funciona só nos temas comuns, e o mais raro tem 14 casos contra 1.207 do mais comum",
      "A resposta de produto é negativa e está escrita: o alvo de 0,70 de micro-F1 não é alcançado em cobertura nenhuma, e o melhor ponto da curva é 0,694 respondendo um décimo dos casos",
      "A regra de dicionário entra como linha de base e não é espantalho: ela sozinha já acerta um dos temas em dois terços dos casos, e o modelo ganha 1,84x dela",
      "Um limiar por tema, ajustado na validação: corte único para 32 temas de frequências muito diferentes é simplicidade falsa",
      "O classificador é linear de propósito: num setor regulado, explicação que não vem do modelo que decidiu é uma segunda opinião",
    ],
    stack: ["Python 3.12", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/fabriciojunio/verbete",
    demo: "/resultados/verbete",
    year: "2026",
    snippetLang: "python",
    snippet: `# As keywords vêm da MESMA indexação que atribui o tema, então
# usá-las é usar parte do trabalho que produziu o rótulo. Ficam
# atrás de uma chave, e o projeto mede os dois casos.
partes = [registro.get("ementa") or ""]
if usar_ementa_detalhada:
    partes.append(registro.get("ementa_detalhada") or "")
if usar_keywords:                      # <- +0,140 de micro-F1
    partes.append(registro.get("keywords") or "")`,
  },
  {
    slug: "prumo",
    name: "Prumo",
    oneLine: "O desempenho passado de um fundo prevê o futuro?",
    what: "Responde, em 42,3 milhões de linhas de cota diária da CVM, a pergunta que uma mesa de seleção de fundos responde todo dia. 40.961 séries de fundo, de 2018 a 2025, processadas ano a ano para caber na memória, carregando a última cota de um ano para o seguinte.",
    role: "Escrevi o leitor dos três arquivos da CVM com a medição de cobertura de cada junção, o cálculo de retorno e risco, as três medidas de persistência e a análise de taxa. 58 testes, que rodam contra dois mundos sintéticos de resposta conhecida.",
    highlights: [
      "A resposta é 'quase nada, e depende da classe': renda fixa persiste de verdade, com razão de chances de 3,82, e ações não persiste, com 0,94 e intervalo encostando em 1 pelo lado de cima",
      "Em dinheiro não vale nada: a diferença entre o melhor e o pior quintil é de 0,72% no ano seguinte, e a dispersão dentro de cada quintil é de 19,20%. Vinte e seis vezes maior",
      "O achado que não estava no roteiro: a matriz de transição é em U. Do quintil pior, 30,0% ficam e 29,6% vão direto para o melhor. Quem está nas pontas é o fundo volátil, e o que persiste é o risco, não o retorno",
      "O viés de sobrevivência está medido: só 19% das séries existem do início ao fim do período, e 37% somem antes do fim",
      "A seção da taxa de administração é sobre o dado e não sobre o mercado: ela só existe no cadastro antigo, que virou histórico depois da Resolução CVM 175 e casa com 24,3% dos fundos, e quem tem taxa conhecida rende 4,2 pontos percentuais menos que o resto",
      "O comportamento do dado foi medido e nada disso está na documentação: o CNPJ vem como texto num arquivo e como inteiro noutro, o que faz a junção casar zero linhas sem erro nenhum",
      "Com 120 mil pares, 37 de 42 testes são significativos com e sem correção: o valor-p para de informar e o tamanho do efeito é o que resta",
    ],
    stack: ["Python 3.12", "pandas", "NumPy", "SciPy", "Matplotlib", "PyArrow"],
    github: "https://github.com/fabriciojunio/prumo",
    demo: "/resultados/prumo",
    year: "2026",
    snippetLang: "python",
    snippet: `# O 1.0 na frente é o valor ANTES do primeiro retorno, e ele
# precisa estar no topo: sem ele, um fundo que só cai desde o
# primeiro dia tem a pior queda medida pela metade.
acumulado = np.concatenate([[1.0], np.cumprod(1.0 + r)])
topo = np.maximum.accumulate(acumulado)
queda = acumulado / topo - 1.0      # <- pego por teste`,
  },
  {
    slug: "trato",
    name: "Trato",
    oneLine: "Quem contatar, e não quem vai pagar",
    what: "Modelagem de uplift num experimento aleatorizado de verdade, com 64 mil pessoas e 21 mil no controle. Um modelo de resposta prevê quem paga; um modelo de uplift prevê quem paga por causa do contato. Usar o primeiro para escolher quem contatar manda mensagem para quem já ia pagar sozinho.",
    role: "Escrevi a conferência da aleatorização, as medidas de uplift, os quatro candidatos e a tradução para dinheiro com custo e valor declarados. 34 testes, em mundos sintéticos de efeito conhecido.",
    highlights: [
      "Antes de concluir que o modelo é fraco, o projeto mede se existe heterogeneidade para achar: o efeito dentro de 19 subgrupos conhecidos de antemão, sem modelo nenhum e com correção de multiplicidade",
      "Num braço do experimento nenhuma fatia difere do efeito geral, e os modelos confirmam sem separar topo de fundo de forma distinguível do acaso. O resultado negativo está correto, e isso só dá para afirmar porque a heterogeneidade foi medida em separado",
      "No outro braço ela existe e é interpretável, com 3,4x de diferença entre quem comprou de um lado e do outro. Aí o modelo encontra: separação de 3x entre os 30% do topo e do fundo, com intervalos que não se sobrepõem",
      "Em dinheiro: 11,6% a mais de resultado contatando 25 pontos percentuais menos gente",
      "O Qini engana e o projeto mostra como: o ganho da curva é uma contagem de eventos, então quem ordena por respondentes acumula ganho cedo mesmo sem separar efeito nenhum",
      "O piso do acaso é a média de trinta sorteios e não um: um sorteio só produz Qini de −0,117 a +0,143 nesta base",
      "Uplift não tem rótulo individual: ninguém é observado contatado e não contatado ao mesmo tempo. Toda a validação é por grupo, e essa ausência de métrica individual é deliberada",
    ],
    stack: ["Python 3.12", "scikit-learn", "pandas", "NumPy", "SciPy"],
    github: "https://github.com/fabriciojunio/trato",
    demo: "/resultados/trato",
    year: "2026",
    snippetLang: "python",
    snippet: `# O efeito do contato, medido DENTRO do grupo que o modelo
# escolheu. É assim que se valida uplift: não existe rótulo
# individual, porque ninguém é visto nos dois estados.
for nome in grupos_distintos:
    m = grupos == nome
    e = efeito_medio(y[m], tratado[m])   # <- medido, não previsto`,
  },
  {
    slug: "feira",
    name: "Feira do Comando",
    oneLine: "Pedidos orientados a eventos com saga e compensação",
    what: "Quatro serviços Spring Boot conversando por Kafka. Cada um com o próprio banco, nenhum lendo tabela do outro. A saga precisa sobreviver a mensagem repetida, fora de ordem e atrasada, e um modelo de leitura em MongoDB responde numa consulta o que antes exigia juntar três serviços no navegador.",
    role: "Escrevi tudo: os contratos de evento selados, o outbox transacional compartilhado, o consumidor idempotente, a saga do pedido e a projeção que alimenta o modelo de leitura. O caso que mais deu trabalho foi a corrida em que o pagamento é aprovado durante o cancelamento, que termina em estorno.",
    highlights: [
      "O rastro distribuído atravessa o outbox: o contexto é gravado numa coluna e propagado em cabeçalho do Kafka, senão ele morre no commit e o painel mostra rastros soltos em vez de uma saga inteira",
      "Outbox com SELECT FOR UPDATE SKIP LOCKED, para rodar em várias instâncias",
      "Concorrência provada com dez threads reais contra um PostgreSQL real",
      "Modelo de leitura em MongoDB: o documento é derivado dos eventos, então pode ser jogado fora e reconstruído do tópico",
      "O CI cria um cluster Kubernetes de verdade e aplica os manifestos, além de validar o Terraform",
      "Migração que apaga ou renomeia coluna reprova no build: a atualização é gradual e o despachante da versão antiga continua lendo o outbox durante a troca",
      "187 testes, nenhum deles precisando de Docker instalado",
    ],
    stack: ["Java 21", "Spring Boot", "Kafka",
      "OpenTelemetry",
      "k6", "PostgreSQL", "MongoDB", "Kubernetes", "Terraform", "React 19"],
    github: "https://github.com/fabriciojunio/feira-do-comando",
    demo: "https://feira-do-comando.vercel.app",
    year: "2026",
    snippetLang: "java",
    snippet: `// A aprovação chegou depois de o cancelamento começar.
// O dinheiro já saiu: não dá para ignorar, tem que voltar.
case PagamentoAprovado p when status == CANCELANDO ->
    new Decisao(false,
        List.of(new PagamentoEstornado(
            id, p.valor(), Motivo.PEDIDO_CANCELADO)),
        "aprovacao tardia: estornando");`,
  },
  {
    slug: "outorga",
    name: "Outorga TV",
    oneLine: "Streaming white-label: sem outorga, não vai ao ar",
    what: "Plataforma de streaming multi-tenant. A regra que organiza o sistema inteiro é uma só: nada vai ao ar sem licença vigente para o território e a janela de exibição.",
    role: "Modelei o domínio inteiro. Publicar é a única porta para o ar, e ela exige a licença na assinatura do método, então não existe caminho de código que publique sem ela. Uma varredura horária tira do ar o que venceu e devolve o que foi renovado.",
    highlights: [
      "Domínio sem uma linha de Spring, verificado por teste de arquitetura",
      "Todo repositório recebe o tenant na assinatura, não em variável de contexto",
      "LGPD com exportação e anonimização implementadas, não prometidas",
      "Migração que apaga ou renomeia coluna reprova no build: durante uma publicação as duas versões rodam juntas, e aqui coluna que some devolve conteúdo negado a quem pagou",
      "275 testes contra PostgreSQL de verdade",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "JdbcClient", "Next.js"],
    github: "https://github.com/fabriciojunio/outorga-tv",
    demo: "https://outorga-tv.vercel.app",
    demoAcesso: "espectador@exemplo.com / demonstracao2026",
    year: "2026",
    snippetLang: "java",
    snippet: `// A licença entra por parâmetro, e não por consulta interna.
// Quem chama é obrigado a tê-la em mãos: não há como publicar sem.
public Result<Titulo> publicar(Licenca licenca, Instant agora) {
    if (!licenca.cobre(this.territorio, agora))
        return Result.erro(FalhaDeNegocio.SEM_LICENCA_VIGENTE);
    return Result.ok(comStatus(Status.PUBLICADO));
}`,
  },
  {
    slug: "permaneia",
    name: "PermaneIA",
    oneLine: "Assistente de estudos com RAG e alerta de risco de evasão",
    what: "Duas frentes contra a evasão no ensino superior. Um assistente que responde dúvidas do aluno sobre os documentos oficiais da disciplina, com a fonte citada, e que diz quando a informação não está no material em vez de arriscar uma data de prova. E um painel que ordena a turma por risco de evasão calculado com lógica fuzzy.",
    role: "Escrevi o motor de inferência fuzzy de Mamdani do zero, sem biblioteca, e a camada de RAG inteira: chunking por unidade de informação, busca híbrida com fusão de rankings, limiar de relevância, agenda calculada em código e as barreiras contra injeção de prompt.",
    highlights: [
      "Um aluno com média 8,6 e presença de 34% recebe risco alto; o critério por nota, que é o usado nas secretarias, diria que está tranquilo",
      "O registro de perguntas mostrou o defeito que a bancada não pegava: \"Quando é a Prova P1?\" respondia e \"quando vai ser a prova\" recusava, com a mesma similaridade. A busca ganhou um segundo braço, por casamento de termos",
      "Perguntas de calendário não são feitas pelo modelo: \"qual é a próxima aula\" é resolvida em código, sobre as datas do próprio material, e o modelo só redige",
      "Quando o material não responde, ele responde mesmo assim sobre a faculdade e sobre o conteúdo, e o aviso de que aquilo não tem fonte é escrito pelo código, não pelo modelo",
      "Funciona sem chave de API: no modo degradado ele transcreve o documento em vez de redigir, o que é ainda mais estrito quanto a não inventar",
      "2.093 testes e nove defeitos documentados, um deles existindo só no artefato publicado e não no código-fonte",
    ],
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "pgvector", "Prisma", "Gemini API"],
    github: "https://github.com/fabriciojunio/permaneia",
    labDemo: "/projetos/permaneia.ts",
    demo: "https://permaneia.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Regra 7: o caso que o projeto existe para pegar.
// Notas boas não anulam presença e engajamento em queda.
r(7, "baixa", "alta", "baixo", "alto",
  "Um critério baseado só em nota classificaria este aluno " +
  "como tranquilo, e ele não está.");

// Disparo pelo mínimo: a regra só vale o quanto vale o seu
// antecedente mais fraco.
const forca = Math.min(
  graus.frequencia[regra.se.frequencia],
  graus.notas[regra.se.notas],
  graus.engajamento[regra.se.engajamento],
);`,
  },
  {
    slug: "conectagente",
    name: "ConectAgente",
    oneLine: "Iniciação científica na Saruê, a incubadora da UNESP: coleta em campo sem internet",
    what: "Projeto de iniciação científica incubado na Saruê, a incubadora de empresas da UNESP em Bauru. O agente comunitário de saúde registra a visita no celular sem rede nenhuma e o aparelho sincroniza quando volta a ter sinal. Nunca foi a campo com agente de verdade: é pesquisa, não produto em uso, e está escrito assim de propósito.",
    role: "Escrevi o motor de sincronização, com fila de saída, nova tentativa e resolução de conflito, e o esquema do SQLite com busca em texto para procurar morador sem nenhuma chamada de rede.",
    highlights: [
      "A fila de saída guarda a alteração local e só a descarta quando o servidor confirma: perder sinal no meio da visita não perde a visita",
      "Busca em texto dentro do SQLite, porque no bairro onde o agente trabalha a rede não é lenta, ela não existe",
    ],
    stack: ["React Native", "Expo SDK 54", "SQLite", "Supabase", "Zod"],
    github: "https://github.com/fabriciojunio/ConectAgente",
    demo: "https://conectagente-web.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `async drain(): Promise<{ sent: number; failed: number }> {
  const online = (await NetInfo.fetch()).isInternetReachable;
  if (!online) return { sent: 0, failed: 0 };

  const rows = await this.db.getAllAsync<Pending>(
    "SELECT * FROM outbox ORDER BY at ASC LIMIT 100",
  );
  /* ... */
}`,
  },
  {
    slug: "koracrm",
    name: "KoraCRM",
    oneLine: "CRM em Laravel onde a camada de aplicação não conhece Eloquent",
    what: "Lead, funil de vendas em cinco estágios, tarefa com prazo, painel com valor por estágio, equipe com perfil de acesso e auditoria de toda alteração com autor. Atende pedido de LGPD do titular sem perder o histórico.",
    role: "Escrevi o back-end inteiro em quatro camadas, e a regra que sustenta tudo é que o serviço recebe um DTO e conversa com uma interface de repositório, nunca com o Eloquent. Trocar o ORM não deveria obrigar a reescrever regra de negócio.",
    highlights: [
      "Duas regras de domínio com teste dos dois lados: lead nasce sempre em novo, e lead em ganho ou perdido não volta para o funil",
      "A camada de aplicação não conhece Eloquent, e é isso que mantém a regra testável sem banco",
      "Auditoria automática: cada movimentação entre estágios fica registrada com autor",
      "126 testes, cobertura de 90% no back-end, e o CI reprova abaixo de 85%",
      "Só a interface está publicada: a demonstração roda no navegador com dados de exemplo, porque o Laravel não está no ar",
    ],
    stack: ["PHP 8.2", "Laravel 11", "React 18", "Sanctum", "MySQL 8", "Redis", "Pest", "PHPStan", "Docker"],
    github: "https://github.com/fabriciojunio/KoraCRM",
    demo: "https://koracrm-frontend.vercel.app",
    year: "2026",
    snippetLang: "php",
    snippet: `public function moveDeal(Deal $deal, Stage $to, ?int $pos = null): Deal
{
    return DB::transaction(function () use ($deal, $to, $pos) {
        $from = $deal->stage;
        $deal->update([
            'stage_id' => $to->id,
            'position' => $pos ?? $this->nextPosition($to),
        ]);
        event(new DealMoved($deal, $from, $to));
        return $deal->fresh(['stage', 'contact', 'company']);
    });
}`,
  },
  {
    slug: "apontamento-horas",
    name: "Horalis",
    oneLine: "Gestão de horas multiusuário com RBAC, SLA e dashboards",
    what: "Plataforma de apontamento de horas por cliente, com múltiplos usuários e papeis (admin, GP, analista, visualizador), SLA automático, dashboards de controle, auditoria e relatórios Excel para o financeiro.",
    role: "Construí a autenticação multiusuário com bcrypt e JWT, o controle de acesso por papel (RBAC), o SLA automático e a camada de auditoria.",
    highlights: [
      "Multiusuário com RBAC: admin, GP, analista e visualizador",
      "Cada colaborador vê só os próprios lançamentos; GP e admin têm visão consolidada do time",
      "SLA automático: pendente (0-2d), alerta (2-5d) e atraso (5d+)",
      "Export Excel mensal para o financeiro e log de auditoria de cada ação",
    ],
    stack: ["Next.js 14", "Prisma", "PostgreSQL", "JWT", "Tailwind"],
    github: null, // repositório privado
    demo: "https://apontamento-horas.vercel.app",
    labDemo: "/projetos/apontamento-horas.ts",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Validação no boundary da API (route handler → domínio)
export const ApontamentoCreate = z.object({
  tipo:      z.enum(TIPOS),                        // desenvolvimento, suporte, reunião...
  data:      z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, "AAAA-MM-DD"),
  horas:     z.coerce.number().min(0.5).max(24),  // de 30min a 24h
  clienteId: z.string().min(1, "selecione um cliente"),
  chamado:   z.string().max(100).optional().nullable(),
  descricao: z.string().min(1).max(1000).trim(),
});`,
  },
  {
    slug: "balcao",
    name: "Balcão",
    oneLine: "IA de vendas no WhatsApp em que o modelo não escreve números",
    what: "Atendimento, negociação e avaliação de aparelhos usados no WhatsApp para lojas de celular. O modelo entende o cliente e escolhe a estratégia da conversa, mas preço à vista, parcelamento, desconto máximo e valor de troca saem de funções determinísticas. A mensagem final ainda passa por um auditor antes do envio.",
    role: "Desenhei o auditor de saída, o motor de preço e de avaliação de usado, e as guardas que rodam antes do modelo (pedido de saída, pedido de atendente e escopo).",
    highlights: [
      "O modelo devolve texto com marcadores; quem calcula o valor é o domínio",
      "Auditor reprova qualquer algarismo sem origem numa consulta registrada",
      "Duas reprovações na mesma conversa escalam para atendimento humano",
      "Valor de troca só sai acompanhado da ressalva de pré-avaliação (art. 30 do CDC)",
    ],
    stack: ["Node 20", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Zod"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Balcão: o auditor confere cada número antes do envio
for (const o of extrairOcorrencias(texto)) {
  if (o.tipo === "monetario" && !combina(o.valor, permitidos.monetarios)) {
    violacoes.push({
      tipo: "monetario_nao_autorizado",
      trecho: o.bruto,
      motivo: "Valor sem origem em consulta registrada nesta conversa.",
    });
  }
}
return { aprovado: violacoes.length === 0, violacoes };`,
  },
  {
    slug: "guarda-banco",
    name: "Guarda do Banco",
    oneLine: "Trava no servidor contra DELETE e UPDATE acidentais",
    what: "Proteção instalada no próprio banco: todo DELETE ou UPDATE tem limite de linhas afetadas por comando, e passar do limite aborta a transação. Como a regra mora no servidor, vale igual no DBeaver, no Workbench, no SSMS ou no psql. Scripts para PostgreSQL, MySQL e SQL Server.",
    role: "Defini o núcleo: limite por linhas afetadas em vez de caçar DELETE sem WHERE. Também o controle de nível de aninhamento, que faz a cascata somar no mesmo comando, e o painel local de liberação.",
    highlights: [
      "Limite de linhas cobre WHERE amplo demais, OR no lugar de AND e cascata inesperada",
      "Aborta em BEFORE ROW: falha na linha do limite mais um, sem materializar tudo",
      "ON DELETE CASCADE entra na conta do comando de origem, não zera o contador",
      "Liberar a proteção exige motivo escrito e vale só dentro da transação",
    ],
    stack: ["PostgreSQL", "PL/pgSQL", "MySQL", "SQL Server", "Python"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "sql",
    snippet: `-- Guarda do Banco: conta as linhas e decide, linha a linha
create or replace function guarda.contar_e_checar()
returns trigger language plpgsql security definer as $$
declare
    v_linhas bigint;
    v_limite integer;
begin
    v_linhas := guarda.ler_contador(guarda.chave_contador(tg_op)) + 1;
    perform set_config(guarda.chave_contador(tg_op), v_linhas::text, true);

    if guarda.esta_liberado() then
        return case when tg_op = 'DELETE' then old else new end;
    end if;

    v_limite := guarda.limite(tg_table_schema, tg_table_name, tg_op);
    if v_limite is not null and v_linhas > v_limite then
        raise exception 'GUARDA: % em %.% passou de % linhas.',
            tg_op, tg_table_schema, tg_table_name, v_limite;
    end if;

    return case when tg_op = 'DELETE' then old else new end;
end;
$$;`,
  },
  {
    slug: "registraservico",
    name: "RegistraServiço",
    oneLine: "Registro de serviços com tipos e campos configuráveis",
    what: "Sistema multi-tenant de registro de prestação de serviços, pensado para órgãos públicos e equipes de campo. Os tipos de serviço e os campos de cada formulário são configurados pela organização, não escritos no código. Trilha de auditoria, exportação para BI e PWA que instala sem loja.",
    role: "Modelei o schema configurável (tipo de serviço, campos personalizados e registro em JSON validado) e escrevi o validador dinâmico que confere os dados contra a definição de campos que está no banco.",
    highlights: [
      "O formulário não está no código, está no banco: o mesmo motor atende outra organização sem reescrita",
      "JWT no middleware edge com revogação imediata de sessão",
      "RBAC de quatro papéis: admin, gestor, operador e visualizador",
      "Registro em campo em dois toques, com exportação CSV para Power BI",
    ],
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
    github: null, // repositório privado
    demo: "https://registraservico.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// RegistraServiço: valida o registro contra os campos do banco
export function validarDados(campos: DefinicaoCampo[], entrada: ValoresDados) {
  const valores: ValoresDados = {};
  const erros: Record<string, string> = {};

  for (const campo of campos) {
    if (!campo.ativo) continue;
    const bruto = entrada[campo.chave];

    if (vazio(bruto)) {
      if (campo.obrigatorio) erros[campo.chave] = \`"\${campo.rotulo}" é obrigatório.\`;
      continue;
    }
    aplicarTipo(campo, bruto, valores, erros);
  }
  return { ok: Object.keys(erros).length === 0, valores, erros };
}`,
  },
  {
    slug: "sintonia",
    name: "Sintonia",
    oneLine: "Rede social onde a conversa gira em torno da música que está tocando",
    what: "Monorepo com API NestJS, site Next.js e app Expo. Tocando agora em tempo real, conversas com mensagens efêmeras (TTL ou visualização única), foguinho e pet do grupo. A integração com serviços de música é uma porta com adapters.",
    role: "Montei a fundação: Clean Architecture na API, a porta de provedor de música com adapters, o domínio puro de efemeridade e de streak, e a camada de LGPD (exportação, exclusão com anonimização e expurgo de mídia).",
    highlights: [
      "Porta de música com adapters: Last.fm como principal, porque o Spotify trava apps novos em 25 usuários",
      "Mensagem efêmera expira por TTL ou no ato da leitura, e o job de expurgo apaga de verdade",
      "Domínio de gamificação puro, sem framework, testado fora do NestJS",
      "Tema claro e escuro reais, com tokens compartilhados entre web e mobile",
    ],
    stack: ["NestJS", "Next.js 15", "Expo", "Prisma", "PostgreSQL", "Turborepo"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Sintonia: a chama do grupo sobe uma vez por dia
export function registerInteraction(state: StreakState | null, now: Date) {
  const today = toUtcDay(now);
  if (!state) return { count: 1, lastActiveDay: today, active: true };

  const gap = daysBetween(state.lastActiveDay, today);
  if (gap <= 0) return { ...state, active: true };            // mesmo dia
  if (gap === 1) return { count: state.count + 1, lastActiveDay: today, active: true };
  return { count: 1, lastActiveDay: today, active: true };    // furou, recomeça
}`,
  },
  {
    slug: "jis",
    name: "JIS",
    oneLine: "Agregador de vagas que estima a chance real de cada uma",
    what: "Coleta vagas de oito fontes públicas sem exigir chave de API, descarta o que não tem chance (vaga velha, senioridade acima, região que não contrata quem está no Brasil) e monta o prompt do currículo sob medida para a vaga que sobrou.",
    role: "Escrevi o critério de corte a partir de pesquisa de recrutamento em vez de chute: aderência mínima de stack, prazo até a vaga virar fantasma e filtro de região. O que reprova em qualquer um deles não recebe nota, é descartado.",
    highlights: [
      "Oito fontes reais, entre elas LinkedIn, Remotive, RemoteOK e WeWorkRemotely",
      "Vaga com mais de 30 dias é descartada: a faixa de vaga fantasma vai de 20% a 35% do total publicado",
      "Sem banco de dados: as vagas vêm em tempo real com cache de 30 minutos e o funil fica no navegador",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Vitest"],
    github: "https://github.com/fabriciojunio/jis",
    labDemo: "/projetos/jis.ts",
    demo: "https://jis-vagas.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// Os três primeiros não são peso, são porta. Reprovou, nem pontua.
if (vaga.senioridade === "senior" || vaga.senioridade === "lead") return null;
if (vaga.regiao === "outra") return null;
if (vaga.publicadaEmDias > DIAS_ATE_VIRAR_FANTASMA) return null;

const aderencia = proporcaoDeStack(vaga.stack);
if (aderencia < ADERENCIA_MINIMA) return null;

const recencia = 1 - vaga.publicadaEmDias / DIAS_ATE_VIRAR_FANTASMA;
return Math.round(100 * (0.65 * aderencia + 0.35 * recencia));`,
  },
  {
    slug: "codereview-ai",
    name: "CodeReview AI",
    oneLine: "Code review automatizado com LLM local",
    what: "Plataforma que analisa Java, Python e JavaScript usando Ollama. Detecta bugs, code smells e violações SOLID. Processamento via RabbitMQ, cache Redis de 24h.",
    role: "Implementei o orquestrador assíncrono (fila RabbitMQ + ticket ID) e o sistema de cache por hash do código enviado.",
    highlights: [
      "Processamento assíncrono via fila RabbitMQ com ticket ID por análise",
      "Cache Redis de 24h por hash SHA-256 do código, zero reprocessamento",
      "O rastro da requisição viaja no cabeçalho da mensagem: sem isso a espera na fila, que é a maior fatia da espera do usuário, cai no vão entre dois rastros desconexos",
      "Um trecho de rastro por consulta ao banco, envolvendo o DataSource, que é o que faz o N+1 aparecer",
      "Migração que apaga ou renomeia coluna reprova no build: o consumidor está no meio de trabalho já aceito durante a troca de versão",
    ],
    stack: ["Java 21", "Spring Boot", "Ollama", "RabbitMQ", "Redis", "OpenTelemetry"],
    github: "https://github.com/fabriciojunio/codereview-ai",
    demo: null,
    year: "2025",
    snippetLang: "java",
    snippet: `public String submit(String code, Language lang, String userId) {
    String hash = sha256(code + ":" + lang);
    String cached = redis.opsForValue().get("review:" + hash);
    if (cached != null) return cached;       // hit imediato

    String ticket = UUID.randomUUID().toString();
    repo.create(new ReviewJob(ticket, hash, lang, userId, "PENDING"));
    rabbit.convertAndSend("review.queue",
        new ReviewMessage(ticket, code, lang));
    return ticket;
}`,
  },
  {
    slug: "paiol-tech",
    name: "Paiol Tech",
    oneLine: "SaaS de gestão de dívidas rurais",
    what: "SaaS para produtor rural. Login sem senha (magic link), alertas WhatsApp e Open Finance. Monorepo Turborepo com NestJS (Clean Arch + CQRS) e Next.js PWA.",
    role: "Modelei o domain do agregado de Dívida (com domain events) e o handler CQRS que dispara notificação WhatsApp no vencimento.",
    highlights: [
      "Magic link: login sem senha, só um clique no email",
      "Domain event dispara notificação WhatsApp automaticamente no vencimento",
    ],
    stack: ["Next.js 15", "NestJS", "CQRS", "Turborepo", "PWA"],
    github: "https://github.com/fabriciojunio/paiol-tech",
    demo: "https://paiol-tech.vercel.app",
    year: "2025",
    snippetLang: "typescript",
    snippet: `@CommandHandler(DebtDueCommand)
export class DebtDueHandler implements ICommandHandler<DebtDueCommand> {
  async execute(cmd: DebtDueCommand): Promise<void> {
    const debt = await this.debts.byId(cmd.debtId);
    debt.markDue();                  // emite DebtMarkedDueEvent
    await this.debts.save(debt);
    await this.notify.whatsapp({ /* ... */ });
  }
}`,
  },
  {
    slug: "quantbot-ml",
    name: "Quantbot ML",
    oneLine: "Renda passiva que opera sozinha (paper) e aprende com notícias e resultados",
    what: "Sistema de renda passiva por dividendos (método Barsi/Bazin) que opera sozinho com dinheiro simulado e aprende com os próprios acertos e erros. Junta fundamentos reais (Fundamentus, toda a B3), macro do Banco Central e ~28 fontes de notícias, lê o sentimento com FinBERT-PT-BR e roda na nuvem todo dia via GitHub Actions, gerando relatórios e um track record auditável.",
    role: "Construí o ciclo autônomo de ponta a ponta: a carteira paper que segue os sinais do screener, o módulo de feedback que aprende quais perfis de pick batem o CDI, a camada multi-fonte de dados e notícias, e a automação na nuvem (GitHub Actions + CI). Reaproveitei a base de validação anti-overfitting.",
    highlights: [
      "Opera sozinho na nuvem (GitHub Actions): decide, registra e aprende todo dia, sem servidor",
      "Ciclo de feedback: mede cada pick contra o CDI e ajusta o score conforme acerta ou erra",
      "Multi-fonte gratuita: Fundamentus (DY de toda a B3), Banco Central (macro) e ~28 feeds de notícias",
      "Sentimento das notícias com FinBERT-PT-BR (PyTorch), com fallback léxico sem GPU",
    ],
    stack: ["Python", "PyTorch", "FinBERT-PT-BR", "FastAPI", "GitHub Actions"],
    github: null, // repositório privado
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `def preco_teto_bazin(dividendo_anual: float, dy_alvo: float = 8.0) -> float:
    # Preço justo de Bazin: onde o dividend yield atinge o piso.
    # Com a Selic alta, exijo 8% em vez dos 6% clássicos.
    return round(dividendo_anual / (dy_alvo / 100), 2)

def aprova_barsi(dy_12m: float, payout: float, anos: int) -> bool:
    # setor perene + dividendo consistente, não preço de curto prazo
    return dy_12m >= 5.0 and payout >= 40.0 and anos >= 5`,
  },
  {
    slug: "authcore",
    name: "AuthCore",
    oneLine: "JWT RS256 + refresh rotation com blacklist + 2FA TOTP em Node.js",
    what: "Backend Node.js com Clean Architecture, JWT (RS256) + 2FA TOTP via speakeasy, RBAC (3 roles), blacklist Redis. Frontend React 18 + Vite.",
    role: "Implementei a rotação de refresh-token com blacklist em Redis (cada refresh emite par novo e invalida o anterior).",
    highlights: [
      "JWT RS256 assimétrico + 2FA TOTP: chave privada nunca sai do servidor",
      "Rotação de refresh-token: cada emissão invalida o anterior, sem replay attack",
    ],
    stack: ["Node.js", "Express", "TypeORM", "JWT + 2FA", "Docker"],
    github: "https://github.com/fabriciojunio/authcore",
    demo: "https://frontend-tan-mu-38.vercel.app",
    year: "2025",
    snippetLang: "typescript",
    snippet: `async rotate(refresh: string): Promise<Pair> {
  const decoded = jwt.verify(refresh, this.secret) as { sub: string; jti: string };
  const ok = await this.redis.get(\`rt:\${decoded.jti}\`);
  if (!ok) throw new Error("refresh:revoked");

  await this.redis.del(\`rt:\${decoded.jti}\`);       // invalida o atual
  return this.issue(decoded.sub, await this.roleOf(decoded.sub));
}`,
  },
  {
    slug: "bravor",
    name: "BRAVOR",
    oneLine: "Coach de musculação e corrida com treino, nutrição e recuperação adaptativos",
    what: "App web mobile-first (PWA) e app nativo Android que adapta treino, dieta e recuperação à rotina real do usuário, com base científica. Monorepo com um motor de domínio próprio (fórmulas de treino e nutrição) isolado num pacote testado.",
    role: "Construí o motor de domínio isolado (packages/core), a sessão JWT em cookie httpOnly com renovação automática no middleware, a proteção CSRF por origem e a mitigação da CVE-2025-29927 do Next.js.",
    highlights: [
      "Motor de domínio isolado e testado: 142 testes, cobertura de ~94%",
      "Sessão JWT (jose) em cookie httpOnly, renovada no middleware sem novo login",
      "Triagem de segurança (PAR-Q e checagem de dor) antes de liberar treino",
    ],
    stack: ["Next.js 15", "React 19", "Prisma", "Supabase", "Capacitor"],
    github: null, // repositório privado
    demo: "https://bravor.vercel.app",
    year: "2026",
    snippetLang: "typescript",
    snippet: `// BRAVOR: renovação de sessão + headers de segurança no middleware
const RENOVAR_APOS_SEG = 24 * 60 * 60; // renova o cookie após 1 dia

export async function middleware(request: NextRequest) {
  if (isPublic(request.nextUrl.pathname)) return NextResponse.next();

  const session = await verifySession(cookie(request));
  if (!session) return redirectLogin(request);

  const res = NextResponse.next();
  if (agora() - session.iat > RENOVAR_APOS_SEG) {
    res.cookies.set(COOKIE_NAME, await signSession(session), cookieOptions);
  }
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}`,
  },
  {
    slug: "contaflux",
    name: "Contaflux",
    oneLine: "Conta veículos em vídeo de câmera fixa, por cruzamento de linha",
    what: "Conta os carros que passam por uma via a partir de um vídeo de câmera fixa. Cada veículo é acompanhado quadro a quadro e contado uma única vez, no instante em que atravessa uma linha na cena. Separa por sentido, informa o tipo do veículo e estima velocidade. Tem dois detectores: subtração de fundo, que roda sem instalar nada, e reconhecimento por YOLO.",
    role: "Escrevi a detecção, o rastreio e a regra de contagem, e a dedução automática de onde a linha deve ficar a partir do próprio tráfego. Também a integração do reconhecimento como alternativa à subtração de fundo.",
    highlights: [
      "A linha de contagem é deduzida do tráfego: o programa observa alguns segundos e a coloca perpendicular ao sentido dos carros, sem ninguém clicar",
      "Dois detectores com perguntas diferentes: movimento pergunta se algo se moveu, reconhecimento pergunta se aquilo é um carro",
      "Carro escuro sobre asfalto escuro era classificado como sombra pelo MOG2 e sumia da conta; resolvido usando duas máscaras",
      "Validação com cenas sintéticas de gabarito conhecido, mais cinco vídeos reais conferidos olhando as caixas na tela",
    ],
    stack: ["Python", "OpenCV", "NumPy", "YOLO11", "PyInstaller"],
    github: "https://github.com/fabriciojunio/contaflux",
    labDemo: "/projetos/contaflux.py",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `# Contaflux: de que lado da linha o veículo está
def lado(self, ponto: tuple[float, float]) -> float:
    # O sinal do produto vetorial diz o lado; a troca de sinal entre
    # dois quadros significa que a linha foi atravessada no intervalo.
    return (self.x2 - self.x1) * (ponto[1] - self.y1) - (
        self.y2 - self.y1
    ) * (ponto[0] - self.x1)`,
  },
  {
    slug: "vitrine-bauru",
    name: "Vitrine Bauru",
    oneLine: "Vitrine dos pequenos negócios de Bauru com a SEDECON, em quatro serviços por evento",
    what: "Projeto de extensão com a SEDECON, a secretaria de desenvolvimento econômico da prefeitura de Bauru. O empreendedor cadastra o negócio, a secretaria confere e aprova, e a loja entra numa vitrine pública onde o consumidor fala direto no WhatsApp de quem produz. São quatro serviços Spring Boot com banco próprio cada um, conversando por evento, mais um gateway na borda e um front em React. Está no ar, com banco, API e site publicados, e não só rodando na minha máquina.",
    role: "Escrevi o sistema inteiro e coloquei no ar: os contratos de evento selados, o outbox e o inbox compartilhados, a máquina de estados do cadastro, a saga de exclusão da LGPD, a projeção que alimenta a busca pública, a tela toda e a implantação. Também a decisão de transporte que deixa o mesmo código rodar com Kafka, com Amazon SNS e sem corretor nenhum.",
    highlights: [
      "O transporte de evento é uma interface com três adaptadores: Kafka onde há corretor, Amazon SNS na implantação gerenciada e chamada no processo quando não há corretor nenhum",
      "O rastro distribuído atravessa o outbox: o contexto vai numa coluna e depois em cabeçalho do Kafka ou atributo do SNS, porque o evento é publicado por outra thread e o contexto morreria no commit",
      "O terceiro adaptador nasceu de um erro meu: eu tinha escrito no documento de decisão que não existia mensageria gerenciada gratuita, porque procurei por Kafka gerenciado em vez de procurar pelo problema. SNS e SQS estão na camada permanentemente gratuita da AWS, e o adaptador entrou sem tocar no outbox, no inbox nem em nenhum consumidor",
      "Exclusão de dados pela LGPD é uma saga com prazo e reenvio: três serviços precisam confirmar o apagamento antes de o pedido fechar",
      "O contador de senha errada e a revogação de sessão gravam em transação própria, porque a exceção que os disparava desfazia os dois no rollback; foi um teste de integração que achou isso",
      "Documento aceita o CNPJ alfanumérico que passou a valer em julho de 2026, com o dígito calculado pelo valor ASCII menos 48",
      "1.042 testes verdes sem precisar de Docker: PostgreSQL embarcado e Kafka embarcado sobem dentro do próprio teste",
      "Treze regras de arquitetura conferidas por ArchUnit, entre elas nenhum controlador devolvendo entidade JPA",
      "Publicado de ponta a ponta em camada gratuita: banco no Neon, API em contêiner no Render e o site na Vercel, com CI de três estágios",
      "Os manifestos do Kubernetes tinham um autoscaler apontando para um Deployment que não existia; escrevi uma conferência de coerência que roda no CI sem cluster e reprova esse caso",
    ],
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "Spring Cloud Gateway",
      "Kafka",
      "Amazon SNS e SQS",
      "OpenTelemetry",
      "PostgreSQL",
      "Flyway",
      "Docker",
      "Kubernetes",
      "React",
      "TypeScript",
    ],
    github: "https://github.com/fabriciojunio/vitrine-bauru",
    demo: "https://vitrine-bauru.vercel.app",
    year: "2026",
    snippetLang: "java",
    snippet: `// Vitrine Bauru: o contador de erro sobrevive ao rollback
// Transação própria de propósito: na de fora, a exceção lançada logo
// depois desfazia o incremento, e a conta nunca chegava a travar.
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void anotarSenhaErrada(UUID usuarioId) {
    usuarios.findById(usuarioId).ifPresent(usuario -> {
        usuario.registrarErroDeSenha(relogio.instant());
        usuarios.save(usuario);
    });
}`,
  },
  {
    slug: "cardiocam",
    name: "Cardiocam",
    oneLine: "Mede batimentos cardíacos por vídeo, sem encostar na pessoa",
    what: "Estima frequência cardíaca a partir da variação de cor da pele causada pelo fluxo de sangue, captada por uma webcam comum. A técnica é fotopletismografia remota (rPPG). Implementa e compara quatro algoritmos da literatura, escritos a partir dos artigos originais: GREEN, CHROM, POS e ICA. Começou como trabalho de disciplina e virou a base de uma proposta de pesquisa sobre as duas lacunas abertas da área, que são robustez a movimento e a tom de pele.",
    role: "Montei o caminho inteiro, do recorte do rosto até o número na tela, a comparação entre os quatro algoritmos, a correção pelo fundo do quadro e o simulador que torna o erro mensurável. Também a versão web, que roda tudo no navegador sem servidor.",
    highlights: [
      "O resultado mais útil é a desconfiança do próprio número: o cenário sintético dá 0,02 bpm de erro, e a literatura reporta 3,67 bpm para o mesmo algoritmo em dado real. Duas ordens de grandeza de diferença é assinatura de cenário fácil, não de bom desempenho",
      "Quatro algoritmos no mesmo pipeline. Sob iluminação oscilando dentro da banda cardíaca, GREEN e ICA erram 42 bpm, que é a distância exata entre o pulso e a interferência, enquanto CHROM e POS erram 0,01: olhar só o brilho não distingue chegada de sangue de chegada de luz",
      "A parede atrás da pessoa não tem pulso: o que oscila nela é luz do ambiente, e serve de medida direta da perturbação. Com balanço de branco oscilando, o acerto foi de 1 em 16 sem a correção para 16 em 16 com ela",
      "Localizar o rosto pela cor da pele passou em todo cenário sintético e falhou na primeira foto real: a parede bege do quarto cai na faixa de crominância da pele e é maior que o rosto. A caixa ia para a parede, e nenhum ajuste de limiar conserta uma premissa errada",
      "A saída foi portar a cascata de Haar para o navegador, em JavaScript puro. 107 KB contra 9,3 MB do modelo neural que eu tinha avaliado, e os testes comparam a saída com a do OpenCV sobre os mesmos quadros, byte a byte",
      "O número exibido vem do espectro médio de janelas sucessivas, e não de suavizar estimativas. O peso de esquecimento saiu de medição contra três alternativas, e é o único que ganha da média exponencial nos dois eixos: mais estável e mais rápido para acompanhar mudança real",
      "A correção por iluminação é escolhida por medição, não assumida: as duas versões do sinal são calculadas e a de melhor relação sinal-ruído vence. Existe porque aplicá-la às cegas chegou a piorar a dispersão de 0,10 para 10,12 bpm quando a referência continha roupa que se move com a pessoa",
      "A taxa de captura é limitada a 20 quadros por segundo de propósito: a câmera não pode expor um quadro por mais tempo que o intervalo entre eles, e a literatura põe o ótimo de exposição em 1/16 de segundo. Menos quadros é mais luz, e a banda cardíaca não usa a resolução temporal que 60 compram",
      "A segmentação de pele limiariza crominância e nunca luminância, de propósito: é o que faz o sistema medir qualquer tom de pele com a mesma competência, e os testes cobram isso em oito tons",
      "2.005 testes em Python e 426 no navegador, nenhum com simulacro no lugar do código real. Três existem só para provar que o sistema sabe dizer que não sabe",
    ],
    stack: ["Python", "OpenCV", "NumPy", "SciPy", "JavaScript"],
    github: "https://github.com/fabriciojunio/cardiocam",
    labDemo: "/projetos/cardiocam.py",
    demo: "https://cardiocam.vercel.app",
    year: "2026",
    snippetLang: "python",
    snippet: `# Cardiocam (POS): projeção no plano ortogonal ao tom de pele
PROJECAO = np.array([[0.0, 1.0, -1.0], [-2.0, 1.0, 1.0]])

def combinar(bloco):
    # Variação só de intensidade anda na direção do tom de pele,
    # e ao projetar no plano ortogonal ela desaparece.
    normalizado = bloco / bloco.mean(axis=1, keepdims=True)
    projetado = PROJECAO @ normalizado

    alfa = np.std(projetado[0]) / np.std(projetado[1])
    return projetado[0] + alfa * projetado[1]`,
  },
  {
    slug: "kaida",
    name: "Kaida: Raízes do Esquecimento",
    oneLine: "Metroidvania 2D em Unity, com o jogo montado por código",
    what: "Metroidvania 2D com seis cenas, habilidades que destrancam caminhos, chefe em confronto único com barra de vida única, três tentativas por partida, três níveis de dificuldade e save automático nos marcos de descanso. O projeto gera os próprios assets: um menu no editor fatia os sprites, monta as animações, os prefabs, os tiles e as cenas a partir do código.",
    role: "Cuidei do controlador do jogador (máquina de estados, um arquivo por estado), do chefe e dos geradores de editor que montam o jogo inteiro a partir do código.",
    highlights: [
      "O jogo é montado por scripts de editor: o repositório guarda a receita, não o arquivo de cena binário que ninguém consegue revisar",
      "Coyote time e buffer de pulo: o salto ainda vale por um instante depois de sair da borda, e o comando dado no ar espera o chão",
      "Máquina de estados com um arquivo por estado do jogador, em vez de uma cadeia de condições no Update",
      "A dificuldade escolhida no menu chega numa cópia dos stats, nunca no asset original, que gravaria a alteração no disco",
      "Build do Windows publicado em releases, para jogar sem instalar a engine",
    ],
    stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
    github: "https://github.com/fabriciojunio/kaida",
    labDemo: "/projetos/kaida.cs",
    demo: null,
    year: "2026",
    snippetLang: "csharp",
    snippet: `// Kaida: o pulo perdoa o erro de alguns quadros
void TickTimers(float dt)
{
    coyoteTimer = Mathf.Max(0f, coyoteTimer - dt);
    jumpBufferTimer = Mathf.Max(0f, jumpBufferTimer - dt);
}

// Comando dado no ar, pouco antes de encostar no chão, espera.
public void BufferJump() { jumpBufferTimer = stats.jumpBufferTime; }

public bool ConsumeJumpBuffer()
{
    if (jumpBufferTimer > 0f) { jumpBufferTimer = 0f; return true; }
    return false;
}`,
  },
  {
    slug: "bicudo",
    name: "Bicudo",
    oneLine: "Jogo de um botão em Unity, com o cenário que se mede pela tela",
    what: "Jogo de um botão na linha do Flappy Bird: o pássaro cai sozinho, sobe quando o jogador manda, e a partida acaba no primeiro encostão. Cena única para os três estados, arte recortada por script, quatro efeitos sonoros gerados por síntese e nenhum arquivo de áudio no repositório.",
    role: "Projeto individual: fiz tudo, do recorte dos sprites e da montagem da cena por código até os testes e o executável.",
    highlights: [
      "O impulso troca a velocidade vertical em vez de somar a ela: dois toques seguidos sobem o mesmo tanto que um, e o jogo passa a ser sobre ritmo",
      "Sem Rigidbody2D. A colisão é uma consulta de círculo a cada quadro, porque quem move pelo transform atravessa o cano entre dois quadros sem disparar evento nenhum",
      "O cenário mede a largura visível ao rodar e refaz a conta se a tela muda: com os limites fixos na cena, o chão sumia pela borda e o cano reaparecia do nada à frente do pássaro em monitor ultrawide",
      "Os quatro efeitos sonoros são sintetizados na inicialização, o que evita uma terceira licença de terceiros num jogo em que quatro bipes resolvem",
      "46 testes, e três deles abrem a cena que vai no executável: o placar já ficou uma partida inteira em zero enquanto os testes chamavam o método de pontuar direto e passavam verdes",
    ],
    stack: ["Unity 2022.3", "C#", "Unity Test Framework"],
    github: "https://github.com/fabriciojunio/bicudo",
    labDemo: "/projetos/bicudo.cs",
    demo: null,
    year: "2026",
    snippetLang: "csharp",
    snippet: `// Bicudo: o impulso troca a velocidade, não soma a ela
public void Bater()
{
    // troca seca: subir sempre a mesma altura, venha de onde vier
    VelocidadeVertical = impulso;
}

void Update()
{
    VelocidadeVertical -= gravidade * Time.deltaTime;
    VelocidadeVertical = Mathf.Max(VelocidadeVertical, -quedaMaxima);
    transform.position += Vector3.up * VelocidadeVertical * Time.deltaTime;
}`,
  },
  {
    slug: "laboratorio-vr",
    name: "Laboratório VR",
    oneLine: "Laboratório de química em Realidade Virtual com interação por gaze",
    what: "Laboratório de química em VR feito em Unity, com interação por gaze (olhar) e suporte a Google Cardboard e ao giroscópio do celular. Olhar para um objeto exibe informações; olhar para um ponto de teleporte preenche em verde e move o usuário. Build para Android.",
    role: "Implementei o controle por gaze (raycast a partir da câmera), os pontos de teleporte com timer de permanência do olhar e o controle de câmera por giroscópio ou toque.",
    highlights: [
      "Interação por gaze: raycast da câmera detecta objetos no campo de visão",
      "Teleporte por dwell: o ponto preenche em verde conforme o tempo de olhar",
    ],
    stack: ["Unity", "C#", "Google Cardboard", "Android"],
    github: "https://github.com/fabriciojunio/LaboratorioVR",
    demo: null,
    year: "2025",
    snippetLang: "csharp",
    snippet: `// Laboratório VR: ponto de teleporte ativado por gaze (olhar)
public class TeleportPoint : MonoBehaviour
{
    public float tempoOlhar = 2f;
    private float timer = 0f;

    public void IniciarOlhar()
    {
        timer += Time.deltaTime;
        float progresso = timer / tempoOlhar;
        rend.material.color = Color.Lerp(corOriginal, Color.green, progresso);
        if (timer >= tempoOlhar) Teleportar();
    }

    public void PararOlhar()
    {
        timer = 0f;
        rend.material.color = corOriginal;
    }
}`,
  },
  {
    slug: "almanaque",
    name: "Almanaque",
    oneLine: "Guia e classificados multi-inquilino, com o console de quem atende",
    what: "Plataforma para publicar guias de empresas e classificados: cada cliente tem o portal dele, com categorias, anunciantes e assinatura próprios. Junto com o produto vem o console de suporte, que é a parte incomum: fila de chamados por impacto, triagem em quatro caixas e base de problemas conhecidos ligada à versão que corrigiu.",
    role: "Escrevi tudo, do domínio ao console. A decisão que mais moldou o sistema foi tratar o atendimento como parte do produto, e não como planilha ao lado: chamado não fecha sem classificação, e nada é classificado como defeito sem ter sido reproduzido num ambiente limpo.",
    highlights: [
      "Multi-inquilino com teste: um portal não enxerga o dado do outro, e isso é cobrado na bateria, não confiado ao cuidado de quem escreve a consulta",
      "Busca no Elasticsearch com relevância e acento, e reserva no banco quando o índice cai, porque busca fora do ar não pode derrubar o guia",
      "A rotina de cobrança roda duas vezes sem cobrar duas vezes: a competência do ciclo é a chave de idempotência",
      "Inadimplência com três tentativas antes do cancelamento, e não corte no primeiro erro de cartão",
      "Chamado fechado sem dizer o que era é o que impede descobrir, três meses depois, que o mesmo defeito voltou",
      "PHPStan nível 8, Playwright de ponta a ponta e Kubernetes no repositório",
    ],
    stack: ["PHP 8.3", "Symfony 7.4", "Doctrine", "MySQL 8", "Elasticsearch 9", "Redis", "Twig", "Docker", "Kubernetes", "S3"],
    github: "https://github.com/fabriciojunio/almanaque",
    demo: "https://almanaque-ecru.vercel.app",
    demoAcesso: "suporte@almanaque.com.br / demonstracao2026",
    year: "2026",
    snippetLang: "php",
    snippet: `// A cobrança mensal pode ser disparada duas vezes: por tentativa
// repetida, por fila reprocessada, por alguém rodando na mão.
// A chave é a competência, não o instante da chamada.
public function cobrar(Assinatura \\$assinatura, Competencia \\$ciclo): Cobranca
{
    \\$ja = \\$this->cobrancas->doCiclo(\\$assinatura, \\$ciclo);
    if (\\$ja !== null) {
        return \\$ja;   // mesmo ciclo, mesma cobrança, sem débito novo
    }

    return \\$this->cobrancas->abrir(\\$assinatura, \\$ciclo);
}`,
  },
  {
    slug: "baliza",
    name: "Baliza",
    oneLine: "Vagas livres de estacionamento pela câmera que já está no poste",
    what: "Diz quais vagas de um pátio estão livres a partir do vídeo de uma câmera fixa. Sem sensor no piso, sem cabo novo, sem obra: a câmera que já está lá por segurança enquadra dezenas de vagas ao mesmo tempo.",
    role: "Trabalho de Visão Computacional em grupo de quatro. Montei os dois detectores, o treino no PKLot e a medição que decide qual deles usar em cada câmera.",
    highlights: [
      "São dois detectores, e a diferença é honesta: o geral do COCO acha carro em qualquer pátio sem treino, e o treinado acha a vaga em si, que é o que salva pátio grande onde o carro tem vinte pixels",
      "Quem escolhe não é o gosto: cada mapa de vagas guarda o detector que mediu melhor naquela câmera, e o programa imprime qual carregou",
      "Se os pesos treinados não estiverem em disco, cai no detector geral em vez de falhar",
      "O modelo treinado decora o pátio e não generaliza para câmera nunca vista, e o experimento foi montado justamente para medir esse custo em vez de escondê-lo",
    ],
    stack: ["Python", "YOLO11", "OpenCV", "Streamlit", "PKLot"],
    github: "https://github.com/fabriciojunio/baliza",
    demo: null,
    year: "2026",
    snippetLang: "python",
    snippet: `# O detector geral enxerga o carro; o treinado enxerga a vaga.
# Em pátio fotografado de longe o carro tem vinte pixels e o
# geral simplesmente não o vê, por isso cada mapa guarda o seu.
def carregar(mapa: MapaDeVagas) -> Detector:
    if mapa.detector == "vagas" and PESOS_VAGAS.exists():
        return DetectorDeVagas(PESOS_VAGAS)
    # sem os pesos treinados, cair no geral é melhor que falhar
    return DetectorDeVeiculos(PESOS_COCO)`,
  },
];

// A vitrine tem dois blocos abertos e um acervo fechado, nessa ordem.
//
// Quem abre a página decide em poucos segundos que tipo de problema eu resolvo,
// e quem decide isso é o primeiro bloco. Por isso ele é só modelo e decisão: é
// para onde estou indo, e é o que tem número medido para defender. O segundo é
// o trabalho feito com alguém de fora da sala de aula, que é a prova de que o
// código saiu do meu computador. O resto é acervo e fica fechado, porque lista
// corrida de vinte e cinco itens obriga quem chega a decidir sozinho o que
// importa, e a resposta óbvia é que nada importa muito.
//
// Projeto de repositório privado continua na lista com `github: null`: o que
// desaparece é o link, não o trabalho. O que saiu de vez saiu por decisão de
// posicionamento, não por falta de espaço.

// Ordem do mais forte para o mais fraco, e não por tema nem por data.
//
// Ninguém passa do terceiro card. Então os três primeiros precisam cobrir, em
// ordem: IA que está no ar com modelo de linguagem, profundidade de método, e
// o domínio das empresas para onde estas candidaturas vão. Por isso abre com a
// PermaneIA, o trabalho de conclusão vem logo atrás e o terceiro é risco de
// crédito. O que vem depois está ordenado pelo mesmo critério, e não pelo
// carinho que eu tenho por cada um.
const EIXO = [
  "permaneia",          // RAG no ar, com abstenção e barreira de injeção
  "lastro",             // TCC: estrutura aprendida, 7 algoritmos, deriva medida
  "anteparo",           // IFRS 9: a hipótese de LGD pesa mais que o algoritmo
  "balcao",             // o modelo não escreve número, quem calcula é o domínio
  "verbete",            // PLN: o vazamento de anotação vale +0,140 de F1
  "codereview-ai",      // modelo rodando dentro de casa, com fila e rastro
  "decurso",            // jurimetria: a conta de planilha erra 1,21x para baixo
  "trato",              // uplift: medir se há heterogeneidade antes de culpar o modelo
  "prumo",              // fundos: o que persiste é o risco, não o retorno
  "cardiocam",          // rPPG, quatro algoritmos comparados no mesmo vídeo
  "baliza",             // dois detectores e um terceiro sem rede neural, medidos
  "contaflux",          // contagem por vídeo, com a medição do erro
  "quantbot-ml",        // engenharia de dados e CI que quebra o build
];

const PARCERIA = [
  "vitrine-bauru",      // extensão com a SEDECON de Bauru, no ar
  "conectagente",       // iniciação científica, coleta em campo sem internet
];

// Ordenado por peso técnico, não por data: quem abre o acervo vê primeiro o
// que ainda sustenta uma conversa de arquitetura.
const ACERVO = [
  "feira",              // Kafka, outbox, saga com compensação
  "outorga",            // multi-inquilino, licença como invariante de domínio
  "guarda-banco",       // gatilho que barra DELETE sem WHERE no servidor
  "apontamento-horas",  // RBAC, SLA e exportação
  "authcore",           // JWT RS256, 2FA e RBAC
  "paiol-tech",         // CQRS e Open Finance
  "almanaque",          // multi-inquilino, busca e o console de quem atende
  "koracrm",            // a prova de PHP e Laravel
  "registraservico",    // formulário dinâmico validado por definição de campo
  "jis",                // coleta em oito fontes reais
  "sintonia",           // integração com a Last.fm e estado de ofensiva
  "bravor",             // middleware de sessão no App Router
  "kaida",              // Unity, cenas geradas por código
  "bicudo",             // Unity, individual
  "laboratorio-vr",     // VR com interação por direção do olhar
];

const porSlug = (slug: string) =>
  PROJECTS_SOURCE.find((p) => p.slug === slug)!;

export const PROJETOS_EIXO: SiteProject[] = EIXO.map(porSlug);
export const PROJETOS_PARCERIA: SiteProject[] = PARCERIA.map(porSlug);
export const PROJETOS_ACERVO: SiteProject[] = ACERVO.map(porSlug);

export const PROJECTS: SiteProject[] = [
  ...PROJETOS_EIXO,
  ...PROJETOS_PARCERIA,
  ...PROJETOS_ACERVO,
];

export const SOBRE = {
  nome: "Fabrício Júnio",
  cargo: "AI Engineer",
  cidade: "Bauru, SP",
  bio: "IA que pode ser auditada: resposta com a fonte, recusa quando a fonte não existe, e número calculado pelo domínio em vez de escrito pelo modelo.",
  longBio: [
    "Tenho 21 anos, curso Ciência da Computação na UNISAGRADO e trabalho com integração e automação de processo na Digihub, do grupo Lecom. Treze clientes, de seguros a judiciário.",
    "Construo IA pensando no que acontece quando o modelo erra. Na PermaneIA o RAG é escrito à mão e responde com a fonte ou diz que não sabe. No Balcão o modelo conversa, mas quem calcula preço é o domínio, e um auditor reprova algarismo sem origem. No CodeReview AI o modelo roda dentro de casa, atrás de fila.",
    "A outra metade é quantitativa, e responde como o número foi validado. O Lastro, meu trabalho de conclusão, prova o método contra estrutura conhecida antes de encostar no dado real. Foi assim que achei um defeito do meu próprio algoritmo.",
    "Modelo em caderno não resolve nada. Por isso API atrás de fila, contêiner, integração contínua que barra a entrega, deriva medida em vez de presumida, e o limite escrito junto com o número.",
  ],
  contato: {
    email: "junioad555@gmail.com",
    github: "https://github.com/fabriciojunio",
    linkedin: "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/",
  },
};

export const STACK_GROUPS = [
  {
    // O que a vaga procura pelo nome abre a lista. Não há framework de
    // orquestração aqui de propósito: o RAG, o roteamento e as barreiras foram
    // escritos à mão, e é por isso que sei dizer onde cada um falha.
    label: "ia aplicada",
    items: [
      "RAG com busca híbrida",
      "pgvector",
      "Claude e Gemini",
      "Ollama local",
      "guardas de entrada e auditor de saída",
      "chamada de ferramenta determinística",
    ],
  },
  {
    label: "avaliacao",
    items: [
      "curva de abstenção",
      "medição de vazamento de anotação",
      "validação temporal com purga",
      "bootstrap em blocos",
      "calibração",
      "explicabilidade",
    ],
  },
  {
    label: "dados e modelo",
    items: ["Python", "NumPy", "SciPy", "pandas", "scikit-learn", "NetworkX"],
  },
  {
    // O back-end não sai: é ele que coloca modelo em produção e aguenta o
    // sistema do outro lado cair.
    label: "eixo",
    items: ["Java 21", "Spring Boot", "SQL", "API REST", "Kafka", "RabbitMQ"],
  },
  {
    label: "dados",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "outbox transacional"],
  },
  {
    label: "infra",
    items: ["AWS (SNS, SQS)", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    label: "front",
    items: ["React 19", "TypeScript", "Next.js 15", "React Native"],
  },
];

export const EMPRESAS = [
  "RAG",
  "pgvector",
  "Ollama",
  "LLM em produção",
  "Python",
  "scikit-learn",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Kafka",
  "Docker",
  "Digihub",
  "UNISAGRADO",
  "Incubadora Saruê",
  "Bauru, SP",
];
