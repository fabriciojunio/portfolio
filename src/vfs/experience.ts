import type { VFile } from "../types";

export const experienceYaml: VFile = {
  path: "/experiencia.yaml",
  name: "experiencia.yaml",
  language: "yaml",
  content: `# Histórico profissional
# Nexum Tecnologia — Bauru, SP

- cargo: Analista de Sistemas Júnior
  empresa: Nexum Tecnologia
  periodo: 2026 — presente
  stack:    [Java, JavaScript, MySQL, REST, Git, Lecom BPM]
  entreguei:
    - integração com API IBGE no Lecom (cadastro -80% tempo)
    - desenvolvimento e correção de robôs Java (IDWALL/GIDWALL)
    - projeto Abertura de Conta V13 entregue para Credimogiana
    - integrações REST e RPA com serviços externos

- cargo: Estagiário de Desenvolvimento
  empresa: Nexum Tecnologia
  periodo: 2025 — 2026
  stack:    [Java, JavaScript, MySQL, Git, Lecom BPM]
  entreguei:
    - modelagem de processos e automações no Lecom BPM
    - manutenção e desenvolvimento de robôs Java
    - integrações REST com serviços externos
    - primeiros projetos bancários (fluxo de abertura de conta)
`,
};
