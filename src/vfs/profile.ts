import type { VFile } from "../types";
import { SOBRE, STACK_GROUPS, PROJETOS_PARCERIA } from "../site/data";

export const profileJson: VFile = {
  path: "/perfil.json",
  name: "perfil.json",
  language: "json",
  content: JSON.stringify({
    nome: SOBRE.nome,
    cargo: SOBRE.cargo,
    cidade: SOBRE.cidade,
    empresa: "DIGIHUB Tecnologia",
    disponibilidade: "Disponível para oportunidades",
    foco: "Desenvolvimento, integrações e sustentação de software",
    formacao: "Ciência da Computação, UNISAGRADO",
    trabalho: STACK_GROUPS.filter(g => ["trabalho", "integracoes"].includes(g.label)).flatMap(g => g.items),
    projetos: STACK_GROUPS.filter(g => ["backend", "arquitetura", "interface", "qualidade"].includes(g.label)).flatMap(g => g.items),
    pesquisa: PROJETOS_PARCERIA.map(p => ({ nome: p.name, resumo: p.what })),
    idiomas: ["Português nativo", "Inglês intermediário"],
    contato: SOBRE.contato,
  }, null, 2) + "\n",
};
