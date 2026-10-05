import type { VFile } from "../types";

export const experienceYaml: VFile = {
  path: "/experiencia.yaml",
  name: "experiencia.yaml",
  language: "yaml",
  content: `# Histórico profissional
# Bauru/SP

- cargo: Desenvolvedor BPMS
  modelo: PJ, empresa de tecnologia
  periodo: ago 2026 - presente
  stack:    [Java, Spring Boot, JavaScript, SQL, REST, BPM, RPA]
  entreguei:
    - alteração em processo que já roda e movimenta dinheiro de grande empresa
    - regra simulada contra 331 processos reais antes de mudar uma linha
    - integrações REST e robôs Java entre a plataforma e sistema externo

- cargo: Analista de Sistemas
  modelo: PJ, consultoria de tecnologia
  periodo: jan 2026 - ago 2026
  stack:    [Java, JavaScript, MySQL, REST, Git, BPM, MCP]
  entreguei:
    - MCP ligado a sistema interno para consultar dado sem abrir tela por tela
    - integração com a API do IBGE no BPM (cadastro -80% tempo)
    - desenvolvimento e correção de robôs Java de consulta cadastral
    - fluxo de abertura de conta digital para cooperativa de crédito
    - integrações REST e RPA com serviços externos

- cargo: Estagiário de Desenvolvimento
  modelo: consultoria de tecnologia
  periodo: jun 2025 - jan 2026
  stack:    [Java, JavaScript, MySQL, Git, BPM]
  entreguei:
    - modelagem de processos e automações em BPM
    - manutenção e desenvolvimento de robôs Java
    - integrações REST com serviços externos
    - primeiros projetos bancários (fluxo de abertura de conta)

# Produtos próprios, levados a cliente
- Balcão: agente de vendas e trocas no WhatsApp para lojas de celular
- Horalis: apontamento de horas multiusuário com RBAC, SLA e auditoria
- RegistraServiço: registro de serviços configurável, multi-tenant
`,
};
