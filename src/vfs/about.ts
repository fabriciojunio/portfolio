import type { VFile } from "../types";

export const aboutMd: VFile = {
  path: "/sobre.md",
  name: "sobre.md",
  language: "markdown",
  content: `# Fabrício Júnio

> IA em produção: risco, crédito e decisão. Back-end em Java. Bauru, SP.

Tenho 21 anos, curso Ciência da Computação na UNISAGRADO
e participo da Incubadora Saruê (UNESP Bauru).

Escrevo software porque gosto de ver coisa funcionando
de verdade: não slide, não protótipo, **produção**.

## O que faço hoje

No dia a dia mexo com **BPM**, robôs em **Java** e
integrações via API REST, em projetos bancários de
abertura de conta digital. Uma das integrações que
escrevi, com a API do IBGE, cortou o tempo de cadastro
em 80%.

Nesse caminho também liguei o assistente a sistema
interno por **MCP**, para consultar dado sem abrir tela
por tela.

O que estou construindo agora é **aprendizado de máquina
aplicado a risco e a decisão**. São seis projetos com o
mesmo método: linha de base sem modelo em pé de igualdade,
o limite declarado junto com o número, e resultado negativo
relatado como resultado.

O Lastro, meu trabalho de conclusão, aprende a estrutura de
dependência entre instituições da B3 em vez de recortá-la de
uma matriz de correlação. O Anteparo mostra que a hipótese de
LGD move a provisão 1,45x, mais do que a escolha do algoritmo.
O Prumo processa 42 milhões de linhas de cota para responder
que o que persiste num fundo é o risco, não o retorno.

Na faculdade, os de **visão computacional**: o Cardiocam
mede batimentos cardíacos por vídeo e o Contaflux conta
os veículos que passam numa via.

## Como gosto de trabalhar

- **Clean Architecture quando faz sentido**, não como receita
- **Testes onde dá retorno**: integração no caminho crítico,
  unitário no domínio, E2E no fluxo do usuário
- **Segurança desde o dia 1**: JWT, RBAC, validação Zod,
  CSP, headers HTTP, robots bloqueando bots de IA
- **Português no produto**, código em inglês

## O que estou estudando

\`Quantbot ML\`: renda passiva que opera sozinha na nuvem e aprende (Barsi/Bazin + FinBERT-PT-BR).
\`Balcão\`: agente de vendas no WhatsApp em que o modelo não escreve números.
\`Guarda do Banco\`: trava no servidor contra DELETE e UPDATE acidentais.
\`Sintonia\`: rede social em torno da música que está tocando.

---

\`\`\`bash
$ git log --author="fabricio" --since="6 months" --oneline | wc -l
247
\`\`\`
`,
};
