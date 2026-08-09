import type { VFile } from "../types";

export const aboutMd: VFile = {
  path: "/sobre.md",
  name: "sobre.md",
  language: "markdown",
  content: `# Fabrício Júnio

> Desenvolvedor FullStack, atuando como PJ. Bauru, SP.

Tenho 20 anos, curso Ciência da Computação na UNISAGRADO
e participo da Incubadora Saruê (UNESP Bauru).

Escrevo software porque gosto de ver coisa funcionando
de verdade: não slide, não protótipo, **produção**.

## O que faço hoje

No dia a dia mexo com **BPM**, robôs em **Java** e
integrações via API REST, em projetos bancários de
abertura de conta digital. Uma das integrações que
escrevi, com a API do IBGE, cortou o tempo de cadastro
em 80%.

Nos projetos próprios, mantenho 19 sistemas. De **back-end
Java com Spring Boot** (JIS, CodeReview AI) a **mercado
financeiro** (QuantBot ML, GolData e Paiol Tech com Open
Finance), a produtos que já estão indo para cliente
(Balcão, Horalis e RegistraServiço), passando por
full-stack em **React**.

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
\`Guarda Banco\`: trava no servidor contra DELETE e UPDATE acidentais.
\`Sintonia\`: rede social em torno da música que está tocando.

---

\`\`\`bash
$ git log --author="fabricio" --since="6 months" --oneline | wc -l
247
\`\`\`
`,
};
