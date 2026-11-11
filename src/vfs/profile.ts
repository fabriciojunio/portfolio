import type { VFile } from "../types";
import { SOBRE, STACK_GROUPS, PROJETOS_DESTAQUE, PROJETOS_SEGURANCA } from "../site/data";

export const profileJson: VFile = {
  path: "/perfil.json",
  name: "perfil.json",
  language: "json",
  content: JSON.stringify({
    nome: SOBRE.nome,
    cargo: SOBRE.cargo,
    cidade: SOBRE.cidade,
    empresa: "DIGIHUB Tecnologia",
    disponibilidade: "Disponível",
    cargoAtual: "Analista de Sistemas",
    foco: "Segurança de aplicações (AppSec) e Product Security",
    formacao: "Ciência da Computação, UNISAGRADO (2027)",
    trabalho: STACK_GROUPS.filter(g => g.label === "trabalho").flatMap(g => g.items),
    seguranca: STACK_GROUPS.filter(g => ["appsec", "ferramentas", "identidade", "nuvem", "ia", "privacidade"].includes(g.label)).flatMap(g => g.items),
    destaques: PROJETOS_DESTAQUE.map(p => ({ nome: p.name, resumo: p.oneLine })),
    projetosDeSeguranca: PROJETOS_SEGURANCA.map(p => ({ nome: p.name, resumo: p.oneLine })),
    idiomas: ["Português nativo", "Inglês intermediário"],
    contato: SOBRE.contato,
  }, null, 2) + "\n",
};
