import type { VFile } from "../types";

export const aboutMd: VFile = {
  path: "/sobre.md",
  name: "sobre.md",
  language: "markdown",
  content: `# Fabrício Júnio

> Desenvolvedor FullStack na Nexum Tecnologia. Bauru, SP.

Tenho 20 anos, curso Ciência da Computação na UNISAGRADO
e participo da Incubadora Saruê (UNESP Bauru).

Escrevo software porque gosto de ver coisa funcionando
de verdade: não slide, não protótipo, **produção**.

## O que faço hoje

Na Nexum, mexo com **Lecom BPM**, robôs em **Java** e
integrações via API REST. Implementei a integração com
a API do IBGE que cortou o tempo de cadastro em 80%.
Entreguei o projeto Abertura de Conta V13 pra Credimogiana.

Fora do trabalho, mantenho 14 projetos. Do **ML aplicado
a futebol** (GolData, com Expected Goals e Dixon-Coles)
ao **CRM completo em Laravel** (KoraCRM), passando por
**app offline-first pra Agentes de Saúde do SUS**
(ConectAgente).

## Como gosto de trabalhar

- **Clean Architecture quando faz sentido**, não como receita
- **Testes onde dá retorno**: integração no caminho crítico,
  unitário no domínio, E2E no fluxo do usuário
- **Segurança desde o dia 1**: JWT, RBAC, validação Zod,
  CSP, headers HTTP, robots bloqueando bots de IA
- **Português no produto**, código em inglês

## O que estou estudando

\`Quantbot ML\`: trading quantitativo com PyTorch e FinBERT.
\`Paiol Tech\`: SaaS pra produtor rural com Open Finance.
\`GolData Pro\`: bot de sinais com auditoria por SHA-256.

---

\`\`\`bash
$ git log --author="fabricio" --since="6 months" --oneline | wc -l
247
\`\`\`
`,
};
