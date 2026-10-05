// GERADO POR scripts/extrair-resultados.mjs. Não edite à mão.
//
// Cada número aqui saiu de um artefato de experimento em disco, nos
// repositórios dos seis projetos. Para regerar, com os repositórios ao lado
// deste:
//
//   node scripts/extrair-resultados.mjs
//
// Gerado em 2026-10-05.

import type { ProjetoResultado } from "./tipos";

export const RESULTADOS: ProjetoResultado[] = [
  {
    "slug": "lastro",
    "nome": "Lastro",
    "pergunta": "Quanto tempo a estrutura de dependência entre bancos continua sendo a mesma?",
    "dado": {
      "fonte": "COTAHIST da B3, 2012 a 2025",
      "recorte": "154 janelas de 250 pregões, 22 instituições do setor financeiro",
      "limitacao": "A rede é estimada de retorno diário em janela deslizante. Ela descreve dependência estatística, não causalidade entre instituições."
    },
    "manchete": {
      "valor": "742 pregões",
      "rotulo": "meia-vida da estrutura, IC 95% [638; 874]",
      "leitura": "Cerca de três anos para metade das arestas trocarem. Um modelo de contágio calibrado uma vez e deixado rodando está lendo uma rede que já mudou."
    },
    "alavanca": {
      "tipo": "continua",
      "titulo": "Distância entre as duas janelas",
      "explicacao": "Duas redes estimadas em períodos diferentes compartilham quantas arestas? O eixo é a distância entre elas, medida em pregões. Só entram pares sem sobreposição de amostra: janelas que dividem dias já começam parecidas por construção.",
      "eixoX": {
        "rotulo": "pregões de distância",
        "formato": "inteiro"
      },
      "eixoY": {
        "rotulo": "arestas em comum (Jaccard)",
        "formato": "decimal2"
      },
      "serie": [
        [
          252,
          0.3341
        ],
        [
          294,
          0.3162
        ],
        [
          336,
          0.3082
        ],
        [
          378,
          0.3106
        ],
        [
          420,
          0.3156
        ],
        [
          462,
          0.3142
        ],
        [
          504,
          0.3147
        ],
        [
          546,
          0.3171
        ],
        [
          588,
          0.315
        ],
        [
          630,
          0.3093
        ],
        [
          672,
          0.2972
        ],
        [
          714,
          0.2898
        ],
        [
          777,
          0.272
        ],
        [
          819,
          0.2651
        ],
        [
          861,
          0.2621
        ],
        [
          903,
          0.2569
        ],
        [
          945,
          0.2571
        ],
        [
          987,
          0.2589
        ],
        [
          1029,
          0.2607
        ],
        [
          1071,
          0.26
        ],
        [
          1113,
          0.2607
        ],
        [
          1155,
          0.2552
        ],
        [
          1197,
          0.2535
        ],
        [
          1239,
          0.242
        ],
        [
          1281,
          0.2359
        ],
        [
          1323,
          0.23
        ],
        [
          1365,
          0.2197
        ],
        [
          1407,
          0.2165
        ],
        [
          1449,
          0.2183
        ],
        [
          1491,
          0.219
        ],
        [
          1533,
          0.2195
        ],
        [
          1575,
          0.2226
        ],
        [
          1617,
          0.2238
        ],
        [
          1659,
          0.2207
        ],
        [
          1701,
          0.2161
        ],
        [
          1764,
          0.2014
        ],
        [
          1806,
          0.1882
        ],
        [
          1848,
          0.1872
        ],
        [
          1890,
          0.1772
        ],
        [
          1932,
          0.1751
        ],
        [
          1974,
          0.1688
        ],
        [
          2016,
          0.1665
        ],
        [
          2058,
          0.1646
        ],
        [
          2100,
          0.1684
        ],
        [
          2142,
          0.1696
        ],
        [
          2184,
          0.1713
        ],
        [
          2226,
          0.1773
        ],
        [
          2268,
          0.174
        ],
        [
          2310,
          0.1808
        ],
        [
          2352,
          0.1818
        ],
        [
          2394,
          0.1813
        ],
        [
          2436,
          0.1774
        ],
        [
          2478,
          0.173
        ],
        [
          2520,
          0.1796
        ],
        [
          2562,
          0.1733
        ],
        [
          2604,
          0.1809
        ],
        [
          2646,
          0.1933
        ],
        [
          2688,
          0.1928
        ],
        [
          2751,
          0.1854
        ],
        [
          2793,
          0.1818
        ],
        [
          2835,
          0.1758
        ],
        [
          2877,
          0.1659
        ],
        [
          2919,
          0.1722
        ],
        [
          2961,
          0.1738
        ],
        [
          3003,
          0.1654
        ],
        [
          3045,
          0.1663
        ],
        [
          3087,
          0.1799
        ],
        [
          3129,
          0.2
        ],
        [
          3171,
          0.2115
        ],
        [
          3213,
          0.24
        ]
      ],
      "marcas": [
        {
          "x": 742,
          "rotulo": "meia-vida"
        },
        {
          "y": 0.159,
          "rotulo": "piso do ajuste"
        }
      ],
      "leitura": "A {x} pregões de distância, duas redes compartilham {y} das arestas."
    },
    "contraste": {
      "titulo": "Sete algoritmos nos mesmos 120 problemas com estrutura conhecida",
      "nota": "Distância estrutural menor é melhor. O refinado empata com o PC em distância e ganha em F1 de esqueleto, e isso está relatado como empate e não como vitória (Wilcoxon pareado, p ajustado 0,70).",
      "colunas": [
        "algoritmo",
        "distância média",
        "F1 do esqueleto"
      ],
      "linhas": [
        [
          "PC com Fisher Z",
          "22,26",
          "0,772"
        ],
        [
          "evolutivo refinado",
          "22,28",
          "0,859"
        ],
        [
          "busca tabu",
          "30,11",
          "0,802"
        ],
        [
          "escalada de colina",
          "30,79",
          "0,797"
        ],
        [
          "evolutivo bi-objetivo",
          "50,74",
          "0,586"
        ],
        [
          "evolutivo mono-objetivo",
          "52,24",
          "0,604"
        ],
        [
          "correlação com limiar 0,30",
          "78,76",
          "0,479"
        ]
      ],
      "destaque": 1
    },
    "achado": {
      "titulo": "A aresta que aparece em todas as janelas",
      "linhas": [
        {
          "texto": "ITSA4 e ITUB4",
          "valor": "100,0% das janelas"
        },
        {
          "texto": "BBDC4 e ITUB4",
          "valor": "89,6% das janelas"
        },
        {
          "texto": "BBAS3 e BOVA11",
          "valor": "84,4% das janelas"
        },
        {
          "texto": "PSSA3 e SULA11",
          "valor": "67,5% das janelas"
        }
      ],
      "nota": "A primeira é a holding que controla o banco, e aparecer em 100% das janelas é o que diz que o método está achando dependência real e não ruído."
    },
    "limite": "O teto de ruído medido é 0,43: duas janelas que se sobrepõem já discordam de metade das arestas. Similaridade abaixo disso não separa mudança de estrutura de erro de estimação, e é por isso que o ajuste usa só pares sem sobreposição.",
    "repo": null
  },
  {
    "slug": "anteparo",
    "nome": "Anteparo",
    "pergunta": "Quanto da provisão vem do modelo, e quanto vem de uma hipótese que ninguém estimou?",
    "dado": {
      "fonte": "Yeh e Lien (2009), base de cartão de crédito da UCI",
      "recorte": "30.000 clientes, divisão por cliente em treino, validação e teste",
      "limitacao": "Clientes de Taiwan em 2005. Não permite conclusão sobre carteira brasileira: não existe base pública brasileira de contrato a contrato com inadimplência rotulada."
    },
    "manchete": {
      "valor": "45%",
      "rotulo": "o quanto a provisão se move só trocando a hipótese de perda",
      "leitura": "Trocar o algoritmo de uma regra de atraso para gradiente impulsionado move o Gini de 0,359 para 0,542. Trocar a LGD dentro da faixa plausível move a provisão em 45%. A escolha que ninguém discute na reunião pesa mais que a que todo mundo discute."
    },
    "alavanca": {
      "tipo": "continua",
      "titulo": "LGD, a perda dado o descumprimento",
      "explicacao": "A base não traz recuperação, então a LGD não é estimada: é declarada. Carteira sem garantia fica tipicamente entre 60% e 75%, e o trabalho adota 65%. Os cinco pontos abaixo foram recalculados rodando a provisão inteira, não interpolados.",
      "eixoX": {
        "rotulo": "LGD adotada",
        "formato": "percentual"
      },
      "eixoY": {
        "rotulo": "provisão total da carteira",
        "formato": "moeda"
      },
      "serie": [
        [
          0.45,
          41662789
        ],
        [
          0.55,
          48339933
        ],
        [
          0.65,
          54755708
        ],
        [
          0.75,
          58744606
        ],
        [
          0.85,
          60575482
        ]
      ],
      "marcas": [
        {
          "x": 0.65,
          "rotulo": "hipótese do trabalho"
        }
      ],
      "leitura": "Com LGD de {x}, a provisão da carteira é de {y}."
    },
    "contraste": {
      "titulo": "Os três candidatos no conjunto de teste",
      "nota": "O critério de escolha foi calibração antes de discriminação: um modelo que ordena bem mas superestima o risco entrega provisão errada mesmo acertando quem é pior.",
      "colunas": [
        "modelo",
        "Gini",
        "esperado sobre observado"
      ],
      "linhas": [
        [
          "regra de atraso (sem modelo)",
          "0,359",
          "0,978"
        ],
        [
          "logística com WOE",
          "0,522",
          "0,982"
        ],
        [
          "gradiente impulsionado",
          "0,542",
          "0,991"
        ]
      ],
      "destaque": 2
    },
    "achado": {
      "titulo": "O que a remoção de variável sensível custou",
      "linhas": [
        {
          "texto": "sexo, escolaridade e estado civil removidos",
          "valor": "-0,0024 de Gini"
        },
        {
          "texto": "pior calibração entre os grupos avaliados",
          "valor": "4,6 em um grupo de 91 casos"
        }
      ],
      "nota": "A remoção foi medida, não presumida: custa 0,0024 de Gini, ou seja, o modelo fica marginalmente melhor sem elas. Com custo zero não há argumento técnico para manter. A idade fica, por ter relação econômica direta com renda e ciclo de vida."
    },
    "limite": "A base não traz recuperação, então a LGD é hipótese declarada e não estimativa, e a sensibilidade mostra que ela domina a provisão. A equidade é avaliada por sexo, escolaridade e faixa etária: o grupo de escolaridade 4 tem 91 casos no teste e calibração de 4,6, isto é, o modelo superestima o risco dele por um fator de quase cinco. Grupo pequeno com calibração ruim é o achado de equidade mais importante deste modelo.",
    "repo": null
  },
  {
    "slug": "decurso",
    "nome": "Decurso",
    "pergunta": "Quanto dura um processo judicial, se os que ainda correm não podem ser descartados?",
    "dado": {
      "fonte": "DataJud do CNJ, Procedimento Comum Cível do TJSP",
      "recorte": "4.118 processos ajuizados em janeiro de 2019, observados até 04/10/2026",
      "limitacao": "O DataJud não traz valor da causa nem município preenchido. Qualquer valor em dinheiro aqui é hipótese paramétrica declarada, não medida."
    },
    "manchete": {
      "valor": "1,21x",
      "rotulo": "o quanto a conta de planilha erra para baixo",
      "leitura": "A conta que só olha processo encerrado dá mediana de 791 dias. Kaplan-Meier, que usa também os 856 que ainda correm, dá 955. O erro não é aleatório: processo que ainda corre é justamente o demorado, e descartá-lo tira a cauda inteira."
    },
    "alavanca": {
      "tipo": "continua",
      "titulo": "Dias desde o ajuizamento",
      "explicacao": "A curva é a fração de processos ainda em andamento. Ela não para no último encerrado: cada processo que ainda corre entra como informação parcial até o dia em que foi observado, que é o que a conta de planilha joga fora.",
      "eixoX": {
        "rotulo": "dias desde o ajuizamento",
        "formato": "inteiro"
      },
      "eixoY": {
        "rotulo": "ainda em andamento",
        "formato": "percentual"
      },
      "serie": [
        [
          1,
          0.9998
        ],
        [
          110,
          0.9956
        ],
        [
          152,
          0.9905
        ],
        [
          207,
          0.9852
        ],
        [
          239,
          0.9786
        ],
        [
          267,
          0.9723
        ],
        [
          295,
          0.9667
        ],
        [
          320,
          0.9594
        ],
        [
          350,
          0.9534
        ],
        [
          370,
          0.9427
        ],
        [
          388,
          0.925
        ],
        [
          405,
          0.9087
        ],
        [
          424,
          0.8939
        ],
        [
          442,
          0.8793
        ],
        [
          459,
          0.8694
        ],
        [
          478,
          0.8524
        ],
        [
          497,
          0.8324
        ],
        [
          515,
          0.8125
        ],
        [
          532,
          0.7972
        ],
        [
          549,
          0.7797
        ],
        [
          567,
          0.7613
        ],
        [
          584,
          0.7455
        ],
        [
          602,
          0.7273
        ],
        [
          619,
          0.7125
        ],
        [
          636,
          0.6996
        ],
        [
          654,
          0.685
        ],
        [
          672,
          0.6719
        ],
        [
          691,
          0.6603
        ],
        [
          717,
          0.652
        ],
        [
          737,
          0.6438
        ],
        [
          756,
          0.6297
        ],
        [
          773,
          0.6166
        ],
        [
          792,
          0.6015
        ],
        [
          812,
          0.5864
        ],
        [
          829,
          0.575
        ],
        [
          849,
          0.5619
        ],
        [
          868,
          0.5449
        ],
        [
          889,
          0.5352
        ],
        [
          908,
          0.5255
        ],
        [
          926,
          0.5158
        ],
        [
          944,
          0.5056
        ],
        [
          965,
          0.4956
        ],
        [
          985,
          0.4842
        ],
        [
          1011,
          0.4743
        ],
        [
          1031,
          0.467
        ],
        [
          1053,
          0.457
        ],
        [
          1089,
          0.4488
        ],
        [
          1106,
          0.441
        ],
        [
          1127,
          0.4322
        ],
        [
          1150,
          0.4252
        ],
        [
          1172,
          0.415
        ],
        [
          1191,
          0.4075
        ],
        [
          1213,
          0.3992
        ],
        [
          1232,
          0.39
        ],
        [
          1255,
          0.3805
        ],
        [
          1284,
          0.3703
        ],
        [
          1308,
          0.3609
        ],
        [
          1340,
          0.3531
        ],
        [
          1362,
          0.3439
        ],
        [
          1387,
          0.3361
        ],
        [
          1410,
          0.3283
        ],
        [
          1442,
          0.3198
        ],
        [
          1469,
          0.3128
        ],
        [
          1494,
          0.306
        ],
        [
          1520,
          0.2987
        ],
        [
          1543,
          0.2904
        ],
        [
          1570,
          0.2819
        ],
        [
          1601,
          0.2754
        ],
        [
          1636,
          0.2686
        ],
        [
          1690,
          0.2635
        ],
        [
          1732,
          0.2581
        ],
        [
          1811,
          0.2525
        ],
        [
          1857,
          0.2472
        ],
        [
          1910,
          0.2407
        ],
        [
          1948,
          0.2356
        ],
        [
          1995,
          0.2305
        ],
        [
          2055,
          0.2246
        ],
        [
          2101,
          0.2198
        ],
        [
          2148,
          0.213
        ],
        [
          2202,
          0.2079
        ]
      ],
      "marcas": [
        {
          "y": 0.5,
          "rotulo": "mediana"
        },
        {
          "x": 791,
          "rotulo": "o que a planilha diz"
        }
      ],
      "leitura": "Passados {x} dias, {y} dos processos ainda estavam correndo."
    },
    "contraste": {
      "titulo": "Mediana por assunto, entre os grupos com pelo menos 50 processos",
      "nota": "21 assuntos passaram do mínimo. Por órgão julgador não dá: são 662 grupos com média de 6,2 processos cada, e nenhum chega ao mínimo.",
      "colunas": [
        "assunto",
        "processos",
        "mediana em dias"
      ],
      "linhas": [
        [
          "Rural (Art. 48/51)",
          "60",
          "1359"
        ],
        [
          "Perdas e Danos",
          "90",
          "1155"
        ],
        [
          "Condomínio",
          "57",
          "1139"
        ],
        [
          "Defeito, nulidade ou anulação",
          "53",
          "1045"
        ],
        [
          "Aposentadoria por Incapacidade Permanente",
          "154",
          "978"
        ],
        [
          "Contratos Bancários",
          "70",
          "968"
        ]
      ],
      "destaque": -1
    },
    "achado": {
      "titulo": "O que sobra depois da correção de comparações múltiplas",
      "linhas": [
        {
          "texto": "pares que pareceriam diferentes a 5%",
          "valor": "12 de 55"
        },
        {
          "texto": "pares que sobrevivem à correção",
          "valor": "6"
        }
      ],
      "nota": "Comparar 55 pares sem correção produz diferença significativa por sorteio. Metade do que parecia achado era o número de testes."
    },
    "limite": "20,8% da base ainda corria no fim da observação. Essa fração é o tamanho do viés da conta ingênua, e cresce quanto mais recente for o recorte.",
    "repo": null
  },
  {
    "slug": "prumo",
    "nome": "Prumo",
    "pergunta": "O desempenho de um fundo neste ano diz alguma coisa sobre o próximo?",
    "dado": {
      "fonte": "Informe diário de fundos da CVM",
      "recorte": "42,3 milhões de linhas de cota diária, 40.961 séries de fundo, 2018 a 2025",
      "limitacao": "Só entra no par o fundo presente nos dois períodos. O que fechou no meio sai, e ele é justamente o que foi mal: a medida é de persistência entre sobreviventes, e por isso superestima."
    },
    "manchete": {
      "valor": "+0,34 contra −0,02",
      "rotulo": "correlação de postos entre anos: renda fixa contra ações",
      "leitura": "Renda fixa persiste de verdade: correlação média de 0,34 entre um ano e o seguinte. Ações não persiste: -0,02, e o intervalo da razão de chances encosta em 1. Faz sentido: o que persiste em renda fixa é a taxa cobrada, que é a mesma todo ano. Em ações o que oscila é o retorno."
    },
    "alavanca": {
      "tipo": "categorica",
      "titulo": "Classe do fundo",
      "explicacao": "Cada ponto é a correlação entre a posição do fundo num ano e no ano seguinte, dentro da mesma classe. Zero é o que se espera se o desempenho passado não disser nada.",
      "eixoX": {
        "rotulo": "ano",
        "formato": "inteiro"
      },
      "eixoY": {
        "rotulo": "correlação de postos com o ano seguinte",
        "formato": "decimal2"
      },
      "series": [
        {
          "rotulo": "todos os fundos (contraste)",
          "pontos": [
            [
              2018,
              0.4506
            ],
            [
              2019,
              0.2439
            ],
            [
              2020,
              0.0825
            ],
            [
              2021,
              0.4389
            ],
            [
              2022,
              -0.1284
            ],
            [
              2023,
              -0.2224
            ],
            [
              2024,
              -0.3665
            ]
          ],
          "nota": "120.552 pares de ano, 29.200 fundos"
        },
        {
          "rotulo": "Multimercado",
          "pontos": [
            [
              2018,
              0.3735
            ],
            [
              2019,
              0.2452
            ],
            [
              2020,
              0.1194
            ],
            [
              2021,
              0.3615
            ],
            [
              2022,
              -0.0418
            ],
            [
              2023,
              -0.1028
            ],
            [
              2024,
              -0.1643
            ]
          ],
          "nota": "49.539 pares de ano, 10.743 fundos"
        },
        {
          "rotulo": "Renda Fixa",
          "pontos": [
            [
              2018,
              0.7954
            ],
            [
              2019,
              0.8008
            ],
            [
              2020,
              0.0042
            ],
            [
              2021,
              0.6434
            ],
            [
              2022,
              -0.0269
            ],
            [
              2023,
              -0.1285
            ],
            [
              2024,
              0.3138
            ]
          ],
          "nota": "21.046 pares de ano, 4.311 fundos"
        },
        {
          "rotulo": "Ações",
          "pontos": [
            [
              2018,
              0.0347
            ],
            [
              2019,
              0.0022
            ],
            [
              2020,
              0.1423
            ],
            [
              2021,
              0.1232
            ],
            [
              2022,
              -0.0065
            ],
            [
              2023,
              -0.0586
            ],
            [
              2024,
              -0.358
            ]
          ],
          "nota": "15.453 pares de ano, 3.333 fundos"
        },
        {
          "rotulo": "Cambial",
          "pontos": [
            [
              2018,
              0.872
            ],
            [
              2019,
              0.535
            ],
            [
              2020,
              0.428
            ],
            [
              2021,
              0.5097
            ],
            [
              2022,
              0.7574
            ],
            [
              2023,
              0.3648
            ],
            [
              2024,
              0.3146
            ]
          ],
          "nota": "367 pares de ano, 62 fundos"
        }
      ],
      "marcas": [
        {
          "y": 0,
          "rotulo": "sem persistência"
        }
      ],
      "leitura": "Entre {x} e o ano seguinte, a correlação de postos foi de {y}."
    },
    "contraste": {
      "titulo": "O que o teste encontrou",
      "nota": "37 de 42 testes continuam significativos depois da correção para comparações múltiplas. O número não mudou: nenhum achado dependia de não corrigir.",
      "colunas": [
        "classe",
        "pares",
        "correlação média"
      ],
      "linhas": [
        [
          "todos os fundos (contraste)",
          "120.552",
          "+0,071"
        ],
        [
          "Multimercado",
          "49.539",
          "+0,113"
        ],
        [
          "Renda Fixa",
          "21.046",
          "+0,343"
        ],
        [
          "Ações",
          "15.453",
          "−0,017"
        ],
        [
          "Cambial",
          "367",
          "+0,540"
        ]
      ],
      "destaque": 2
    },
    "achado": {
      "titulo": "O que o filtro de dado sujo tirou",
      "linhas": [
        {
          "texto": "séries curtas demais para medir um ano",
          "valor": "18,2%"
        },
        {
          "texto": "saltos de cota tratados",
          "valor": "6.611"
        },
        {
          "texto": "cobertura da classificação de fundo",
          "valor": "69,6%"
        }
      ],
      "nota": "Salto de cota é desdobramento ou erro de informe, e passa despercebido porque vira retorno de 900% num dia só. Sem tratar isso o fundo vai para o topo do ranking por um motivo que não é desempenho."
    },
    "limite": "Só entra no par o fundo presente nos dois períodos. O que fechou no meio sai, e ele é justamente o que foi mal: a medida é de persistência entre sobreviventes, e superestima.",
    "repo": null
  },
  {
    "slug": "verbete",
    "nome": "Verbete",
    "pergunta": "Vale a pena um classificador recusar o que ele não sabe?",
    "dado": {
      "fonte": "API de dados abertos da Câmara dos Deputados",
      "recorte": "4.494 proposições, 30 temas, divisão temporal com 2024 como teste",
      "limitacao": "Proposição sobre o mesmo assunto reaparece a cada legislatura com ementa quase igual, então a divisão é temporal e não aleatória: divisão aleatória poria a quase-cópia no treino e no teste ao mesmo tempo."
    },
    "manchete": {
      "valor": "+0,140",
      "rotulo": "de micro-F1 que o campo de palavras-chave inflava",
      "leitura": "O campo de palavras-chave da API é preenchido pela mesma indexação humana que atribui o tema. Usá-lo faz o número subir 26%, e um modelo treinado assim pareceria melhor do que vai ser no dia em que a proposição chegar sem indexação. O resultado publicado é o de baixo."
    },
    "alavanca": {
      "tipo": "continua",
      "titulo": "Quanto o modelo aceita responder",
      "explicacao": "Abaixo de um corte de confiança o modelo não responde e manda para revisão humana. Responder menos sobe a qualidade do que foi respondido: a pergunta é quanto, porque cada ponto de cobertura perdido é trabalho que volta para alguém.",
      "eixoX": {
        "rotulo": "cobertura",
        "formato": "percentual"
      },
      "eixoY": {
        "rotulo": "micro-F1 do que foi respondido",
        "formato": "decimal3"
      },
      "serie": [
        [
          0.1001,
          0.694
        ],
        [
          0.2001,
          0.6783
        ],
        [
          0.3002,
          0.6663
        ],
        [
          0.3996,
          0.6638
        ],
        [
          0.4997,
          0.6534
        ],
        [
          0.5997,
          0.6303
        ],
        [
          0.6998,
          0.6212
        ],
        [
          0.7999,
          0.6044
        ],
        [
          0.8999,
          0.5716
        ],
        [
          0.9993,
          0.5418
        ]
      ],
      "marcas": [
        {
          "x": 1,
          "rotulo": "responde tudo"
        }
      ],
      "leitura": "Respondendo {x} das proposições, o micro-F1 do que foi respondido é {y}."
    },
    "contraste": {
      "titulo": "Os candidatos, sem as palavras-chave",
      "nota": "A primeira linha é o piso: um modelo que não lê o texto e sempre chuta os temas mais comuns. Comparar com ela é o que diz se o modelo aprendeu alguma coisa.",
      "colunas": [
        "abordagem",
        "micro-F1",
        "macro-F1"
      ],
      "linhas": [
        [
          "sempre os temas mais frequentes",
          "0,212",
          "0,023"
        ],
        [
          "regra por palavra do nome do tema",
          "0,294",
          "0,263"
        ],
        [
          "TF-IDF com logística por tema",
          "0,542",
          "0,473"
        ]
      ],
      "destaque": 2
    },
    "achado": {
      "titulo": "A taxonomia é desigual, e o micro esconde isso",
      "linhas": [
        {
          "texto": "tema mais comum",
          "valor": "Direitos Humanos e Minorias, 1207 casos"
        },
        {
          "texto": "tema mais raro",
          "valor": "Processo Legislativo e Atuação Parlamentar, 14 casos"
        },
        {
          "texto": "distância entre micro-F1 e macro-F1",
          "valor": "0,069"
        }
      ],
      "nota": "Micro-F1 pondera pelo número de casos e é levado pelos temas grandes. A distância para o macro é o tamanho do que o modelo não aprendeu nos temas raros, e é ela que importa para quem monitora um assunto de nicho."
    },
    "limite": "A divisão é temporal por ano e o teste é um ano só. Mudança de pauta entre legislaturas desloca a distribuição dos temas, e o número aqui não mede isso.",
    "repo": null
  },
  {
    "slug": "trato",
    "nome": "Trato",
    "pergunta": "Contatar menos gente pode render mais do que contatar todo mundo?",
    "dado": {
      "fonte": "Experimento aleatorizado de Kevin Hillstrom (2008)",
      "recorte": "12.713 pessoas no conjunto de teste, com grupo de controle que não recebeu contato",
      "limitacao": "A validação é por grupo e nunca pessoa a pessoa: ninguém é observado contatado e não contatado ao mesmo tempo, então não existe rótulo individual de efeito."
    },
    "manchete": {
      "valor": "+4,93 pp",
      "rotulo": "efeito médio do contato, IC 95% dentro do experimento",
      "leitura": "Esse é o efeito de contatar todo mundo. A pergunta do projeto é outra: existe gente para quem o contato rende mais? A curva abaixo responde, e ela só pode ser construída porque existe grupo de controle. Sem controle não há como separar quem paga de quem paga por causa do contato."
    },
    "alavanca": {
      "tipo": "continua",
      "titulo": "Fração da base contatada, da mais responsiva para a menos",
      "explicacao": "A curva acumula o ganho incremental ao contatar da pessoa com maior efeito previsto para a menor. A linha de baixo é o contraexemplo: ordenar por quem provavelmente paga, em vez de por quem paga por causa do contato.",
      "eixoX": {
        "rotulo": "fração contatada",
        "formato": "percentual"
      },
      "eixoY": {
        "rotulo": "ganho incremental acumulado",
        "formato": "decimal0"
      },
      "serie": [
        [
          0,
          0
        ],
        [
          0.02,
          0.97
        ],
        [
          0.03,
          -2.01
        ],
        [
          0.0499,
          5.21
        ],
        [
          0.0699,
          18.52
        ],
        [
          0.08,
          23.12
        ],
        [
          0.1,
          30.81
        ],
        [
          0.12,
          47.51
        ],
        [
          0.1399,
          64.65
        ],
        [
          0.1499,
          69.52
        ],
        [
          0.17,
          67.33
        ],
        [
          0.19,
          79.67
        ],
        [
          0.2,
          89.69
        ],
        [
          0.2199,
          97.15
        ],
        [
          0.24,
          112.23
        ],
        [
          0.25,
          115.16
        ],
        [
          0.27,
          130.95
        ],
        [
          0.2899,
          144.57
        ],
        [
          0.31,
          156.23
        ],
        [
          0.32,
          159.33
        ],
        [
          0.34,
          158.46
        ],
        [
          0.3599,
          173.39
        ],
        [
          0.3699,
          180.69
        ],
        [
          0.39,
          185.14
        ],
        [
          0.41,
          183.89
        ],
        [
          0.42,
          187.28
        ],
        [
          0.4399,
          199.1
        ],
        [
          0.4599,
          212.73
        ],
        [
          0.47,
          215.06
        ],
        [
          0.49,
          213.41
        ],
        [
          0.51,
          222.4
        ],
        [
          0.5299,
          231.78
        ],
        [
          0.54,
          231.67
        ],
        [
          0.56,
          240.97
        ],
        [
          0.58,
          251.36
        ],
        [
          0.5899,
          256.65
        ],
        [
          0.6099,
          258.21
        ],
        [
          0.63,
          255.23
        ],
        [
          0.64,
          253.64
        ],
        [
          0.66,
          256.57
        ],
        [
          0.6799,
          259.14
        ],
        [
          0.6899,
          262.38
        ],
        [
          0.71,
          262.35
        ],
        [
          0.73,
          273.02
        ],
        [
          0.7499,
          275.41
        ],
        [
          0.7599,
          275.15
        ],
        [
          0.78,
          284.82
        ],
        [
          0.8,
          289.08
        ],
        [
          0.81,
          292.23
        ],
        [
          0.8299,
          297.62
        ],
        [
          0.85,
          301.88
        ],
        [
          0.86,
          300.02
        ],
        [
          0.88,
          301.1
        ],
        [
          0.8999,
          292.17
        ],
        [
          0.9199,
          290.4
        ],
        [
          0.93,
          295.4
        ],
        [
          0.95,
          302.47
        ],
        [
          0.97,
          306.11
        ],
        [
          0.9799,
          307.06
        ],
        [
          1,
          313.32
        ]
      ],
      "serieSecundaria": {
        "rotulo": "ordenado por quem paga",
        "pontos": [
          [
            0,
            0
          ],
          [
            0.02,
            -5.47
          ],
          [
            0.03,
            -7.55
          ],
          [
            0.0499,
            -6.4
          ],
          [
            0.0699,
            1
          ],
          [
            0.08,
            10.39
          ],
          [
            0.1,
            16.83
          ],
          [
            0.12,
            29.45
          ],
          [
            0.1399,
            38.72
          ],
          [
            0.1499,
            48.63
          ],
          [
            0.17,
            76.12
          ],
          [
            0.19,
            86.56
          ],
          [
            0.2,
            94.71
          ],
          [
            0.2199,
            112.25
          ],
          [
            0.24,
            116.56
          ],
          [
            0.25,
            117.04
          ],
          [
            0.27,
            124.01
          ],
          [
            0.2899,
            130.84
          ],
          [
            0.31,
            131.23
          ],
          [
            0.32,
            136.54
          ],
          [
            0.34,
            152.29
          ],
          [
            0.3599,
            158.4
          ],
          [
            0.3699,
            163.97
          ],
          [
            0.39,
            165.43
          ],
          [
            0.41,
            176.25
          ],
          [
            0.42,
            180.35
          ],
          [
            0.4399,
            181.14
          ],
          [
            0.4599,
            182.84
          ],
          [
            0.47,
            181.55
          ],
          [
            0.49,
            188.86
          ],
          [
            0.51,
            197.59
          ],
          [
            0.5299,
            197.42
          ],
          [
            0.54,
            196.69
          ],
          [
            0.56,
            199.14
          ],
          [
            0.58,
            209.73
          ],
          [
            0.5899,
            213.29
          ],
          [
            0.6099,
            211.83
          ],
          [
            0.63,
            220
          ],
          [
            0.64,
            224.87
          ],
          [
            0.66,
            228.96
          ],
          [
            0.6799,
            242.65
          ],
          [
            0.6899,
            249.57
          ],
          [
            0.71,
            252.67
          ],
          [
            0.73,
            255.72
          ],
          [
            0.7499,
            261.01
          ],
          [
            0.7599,
            265.64
          ],
          [
            0.78,
            279.81
          ],
          [
            0.8,
            284.28
          ],
          [
            0.81,
            288.68
          ],
          [
            0.8299,
            295.35
          ],
          [
            0.85,
            298.05
          ],
          [
            0.86,
            296.09
          ],
          [
            0.88,
            298.68
          ],
          [
            0.8999,
            299.25
          ],
          [
            0.9199,
            301.87
          ],
          [
            0.93,
            306.56
          ],
          [
            0.95,
            305.43
          ],
          [
            0.97,
            310.33
          ],
          [
            0.9799,
            312.22
          ],
          [
            1,
            313.32
          ]
        ]
      },
      "marcas": [
        {
          "x": 0.75,
          "rotulo": "contatando 75%"
        }
      ],
      "leitura": "Contatando {x} da base, o ganho acumulado é de {y} visitas a mais."
    },
    "contraste": {
      "titulo": "Qini no conjunto de teste",
      "nota": "Qini mede quanto a ordenação do modelo supera contatar por sorteio. O modelo de resposta, que é o que a maioria usa, fica mais perto do sorteio do que de um modelo de uplift.",
      "colunas": [
        "abordagem",
        "Qini",
        "normalizado"
      ],
      "linhas": [
        [
          "contatar por sorteio (piso)",
          "11,9",
          "0,0073"
        ],
        [
          "modelo de resposta (quem paga)",
          "23,6",
          "0,1507"
        ],
        [
          "dois modelos",
          "33,4",
          "0,2132"
        ],
        [
          "modelo único com interação",
          "33,5",
          "0,2141"
        ],
        [
          "transformação do rótulo",
          "36,6",
          "0,2333"
        ]
      ],
      "destaque": 4
    },
    "achado": {
      "titulo": "Onde a heterogeneidade está, e ela é interpretável",
      "linhas": [
        {
          "texto": "mens = 0",
          "valor": "+7,40 pp"
        },
        {
          "texto": "mens = 1",
          "valor": "+2,18 pp"
        },
        {
          "texto": "womens = 0",
          "valor": "+1,11 pp"
        },
        {
          "texto": "womens = 1",
          "valor": "+7,31 pp"
        }
      ],
      "nota": "O efeito geral é de 4,52 pp. As fatias acima diferem dele depois da correção para comparações múltiplas, e a leitura é direta: a peça é feminina, e funciona em quem compra feminino."
    },
    "limite": "Varejo americano de 2008, não cobrança brasileira. O que transfere é o método: sem grupo de controle aleatorizado nenhuma dessas curvas pode ser construída, e é esse o pedaço que costuma faltar na empresa.",
    "repo": null
  }
];
