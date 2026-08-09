import type { VFile } from "../types";

export const experienceYaml: VFile = {
  path: "/experiencia.yaml",
  name: "experiencia.yaml",
  language: "yaml",
  content: `# Histórico profissional
# Bauru/SP

- cargo: Analista de Sistemas
  modelo: PJ, consultoria de tecnologia
  periodo: 2026 - presente
  stack:    [Java, JavaScript, MySQL, REST, Git, BPM]
  entreguei:
    - integração com a API do IBGE no BPM (cadastro -80% tempo)
    - desenvolvimento e correção de robôs Java de consulta cadastral
    - fluxo de abertura de conta digital para cooperativa de crédito
    - integrações REST e RPA com serviços externos

- cargo: Estagiário de Desenvolvimento
  modelo: consultoria de tecnologia
  periodo: 2025 - 2026
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
