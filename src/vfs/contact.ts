import type { VFile } from "../types";

export const contactTs: VFile = {
  "path": "/contato.ts",
  "name": "contato.ts",
  "language": "typescript",
  "content": "export const contato = {\n  \"email\": \"junioad555@gmail.com\",\n  \"github\": \"https://github.com/fabriciojunio\",\n  \"linkedin\": \"https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/\"\n} as const;\n"
};

export const readmeFile: VFile = {
  "path": "/README.md",
  "name": "README.md",
  "language": "markdown",
  "content": "# Portfólio de Fabrício Júnio\n\nAnalista de Sistemas: desenvolvimento, integrações e sustentação de software.\n\n## Navegação na IDE\n\n- Abra um arquivo na árvore lateral ou pela paleta (Ctrl/Cmd+K).\n- Ctrl/Cmd+P pesquisa arquivos; Ctrl/Cmd+` alterna o terminal.\n- O terminal aceita ls, cat, open, projetos, stack, whoami e ajuda.\n- Run aparece apenas nos exemplos que possuem uma simulação interativa.\n\nOs arquivos são trechos selecionados dos projetos. A IDE não executa Java,\nPHP, Python ou Unity: suas simulações em JavaScript ilustram algoritmos com\ndados de exemplo. A aplicação completa e seus testes ficam nos repositórios.\nO Cardiocam usa sinais sintéticos e não fornece medição clínica validada.\n\n## Experimente\n\n```bash\nopen projetos/permaneia.ts\nrun\nprojetos\nwhoami\n```\n\n## Projetos em destaque\n\nAlmanaque, Vitrine Bauru e Feira do Comando, seguidos de KoraCRM,\nAuthCore e CodeReview AI. O ConectAgente representa a pesquisa aplicada.\nOs demais trabalhos acadêmicos e projetos complementares estão disponíveis\nna seção expansível do site.\n\n[Voltar ao portfólio](/)\n[Código do portfólio](https://github.com/fabriciojunio/portfolio)\n"
};
