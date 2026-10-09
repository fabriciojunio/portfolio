export interface SiteProject {
  slug: string;
  name: string;
  oneLine: string;
  what: string;
  role: string;
  highlights?: string[];
  stack: string[];
  github: string | null;
  demo?: string | null;
  demoAcesso?: string;
  demoNote: string;
  flow: string[];
  idePath: string;
  sourcePath?: string;
  labDemo?: string;
  year: string;
  snippet: string;
  snippetLang: "typescript" | "python" | "java" | "php" | "csharp" | "sql";
}

const PROJECTS_SOURCE: SiteProject[] = [
  {
    "slug": "almanaque",
    "name": "Almanaque",
    "oneLine": "Guias e classificados com console de suporte",
    "what": "Plataforma em PHP e Symfony com portais separados por cliente, busca, assinaturas e atendimento técnico.",
    "role": "Desenvolvi o domínio, as integrações, o console de suporte e os testes automatizados.",
    "highlights": [
      "Isolamento entre clientes e cobrança idempotente",
      "Busca com Elasticsearch e alternativa no banco",
      "Triagem, problemas conhecidos e registro de versões"
    ],
    "stack": [
      "PHP 8.3",
      "Symfony 7.4",
      "Doctrine",
      "MySQL 8",
      "Elasticsearch 9",
      "Redis",
      "Twig",
      "Docker",
      "Kubernetes",
      "S3"
    ],
    "github": "https://github.com/fabriciojunio/almanaque",
    "demo": "https://almanaque-ecru.vercel.app",
    "demoAcesso": "suporte@almanaque.com.br / demonstracao2026",
    "year": "2026",
    "snippetLang": "php",
    "snippet": "    public function buscar(Consulta $consulta): Resultado\n    {\n        try {\n            return $this->principal->buscar($consulta);\n        } catch (\\Throwable $falha) {\n            $this->log->alert('A busca principal falhou; respondendo pela reserva.', [\n                'motor' => $this->principal->nome(),\n                'reserva' => $this->reserva->nome(),\n                'portal' => $consulta->portal->apelido(),\n                'erro' => $falha->getMessage(),\n            ]);\n\n            $resultado = $this->reserva->buscar($consulta);\n\n            return new Resultado(\n                itens: $resultado->itens,\n                total: $resultado->total,\n                facetasPorCategoria: $resultado->facetasPorCategoria,\n                motor: $resultado->motor,\n                comReserva: true,\n            );\n        }\n    }",
    "demoNote": "Demonstração com dados de exemplo. A busca publicada usa o banco; Elasticsearch e rotinas de cobrança podem ser avaliados localmente.",
    "flow": [
      "Explore o guia e pesquise por padaria.",
      "Entre como suporte para ver chamados, triagem e problemas conhecidos.",
      "Consulte o código e o roteiro para testar busca e cobrança localmente."
    ],
    "idePath": "/projetos/almanaque.php",
    "sourcePath": "src/Infraestrutura/Busca/MotorComReserva.php"
  },
  {
    "slug": "vitrine-bauru",
    "name": "Vitrine Bauru",
    "oneLine": "Vitrine de empreendedores com moderação e contato direto",
    "what": "Projeto de extensão da UNISAGRADO voltado aos empreendedores atendidos pela SEDECON de Bauru. Reúne catálogo, busca, moderação e contato pelo WhatsApp.",
    "role": "Desenvolvi os serviços Java, as integrações por eventos e a interface de consulta e gestão.",
    "highlights": [
      "Spring Boot, eventos e isolamento entre serviços",
      "Moderação de cadastros e indicadores de contatos",
      "Testes de integração e fluxo de exclusão de dados"
    ],
    "stack": [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "Spring Cloud Gateway",
      "Kafka",
      "Amazon SNS e SQS",
      "OpenTelemetry",
      "PostgreSQL",
      "Flyway",
      "Docker",
      "Kubernetes",
      "React",
      "TypeScript"
    ],
    "github": "https://github.com/fabriciojunio/vitrine-bauru",
    "demo": "https://vitrine-bauru.vercel.app",
    "year": "2026",
    "snippetLang": "java",
    "snippet": "    @Transactional\n    public void aprovar(UUID empreendedorId, UUID moderador) {\n        var empreendedor = carregar(empreendedorId);\n        var dono = donoDe(empreendedor);\n        var agora = relogio.instant();\n\n        empreendedor.aprovar(moderador, agora);\n\n        outbox.gravar(Topicos.EMPREENDEDORES, new CadastroAprovado(\n                UUID.randomUUID(), Correlacao.atual(), agora,\n                empreendedor.id(), moderador, empreendedor.nomeDoNegocio(),\n                dono.email(), dono.nome()));\n\n        auditor.registrar(moderador, \"cadastro_aprovado\", \"empreendedor\", empreendedor.id(),\n                empreendedor.nomeDoNegocio());\n    }",
    "demoNote": "Demonstração com dados de exemplo e API publicada. A primeira resposta pode demorar enquanto o serviço inicia.",
    "flow": [
      "Pesquise por categoria ou bairro e abra um empreendimento.",
      "Na tela de login, use os botões de demonstração para explorar os perfis.",
      "Confira a moderação e os indicadores; o contato comercial ocorre pelo WhatsApp."
    ],
    "idePath": "/projetos/vitrine-bauru.java",
    "sourcePath": "servico-cadastro/src/main/java/br/com/vitrinebauru/cadastro/aplicacao/ModerarCadastro.java"
  },
  {
    "slug": "feira",
    "name": "Feira do Comando",
    "oneLine": "Pedidos em Java com eventos, idempotência e compensação",
    "what": "Quatro serviços Spring Boot coordenam pedidos, estoque, pagamentos e consultas por eventos Kafka.",
    "role": "Implementei a saga de pedidos, o outbox transacional e os consumidores idempotentes.",
    "highlights": [
      "Outbox e inbox para entrega repetida de eventos",
      "Compensação de estoque e estorno de pagamento",
      "Testes de integração para falhas e mensagens fora de ordem"
    ],
    "stack": [
      "Java 21",
      "Spring Boot",
      "Kafka",
      "OpenTelemetry",
      "k6",
      "PostgreSQL",
      "MongoDB",
      "Kubernetes",
      "Terraform",
      "React 19"
    ],
    "github": "https://github.com/fabriciojunio/feira-do-comando",
    "demo": "https://feira-do-comando.vercel.app",
    "year": "2026",
    "snippetLang": "java",
    "snippet": "    @Transactional\n    public Pedido executar(UUID pedidoId, String clienteId) {\n        var pedido = pedidos.porId(pedidoId)\n                .orElseThrow(() -> new NoSuchElementException(\"pedido nao encontrado\"));\n\n        if (!pedido.clienteId().equals(clienteId)) {\n            // Mesma resposta de \"nao existe\". Dizer \"existe, mas nao e seu\"\n            // permite descobrir quais ids existem.\n            throw new NoSuchElementException(\"pedido nao encontrado\");\n        }\n\n        var decisao = pedido.cancelarAPedidoDoCliente(relogio.instant());\n        if (!decisao.mudouDeEstado()) {\n            throw new CancelamentoNaoPermitido(pedido.status().name());\n        }\n\n        pedidos.salvar(pedido);\n        for (Evento evento : decisao.eventosASeguir()) {\n            saida.gravar(Topicos.PEDIDOS, evento);\n        }\n        return pedido;\n    }",
    "demoNote": "Simulação no navegador. Os serviços Java, Kafka e PostgreSQL são executados localmente com Docker Compose.",
    "flow": [
      "Faça um pedido e acompanhe suas transições.",
      "Peça óleo de soja para observar a recusa e a devolução da reserva.",
      "No repositório, execute os serviços para avaliar o fluxo distribuído real."
    ],
    "idePath": "/projetos/feira.java",
    "sourcePath": "servico-pedidos/src/main/java/br/com/feira/pedidos/aplicacao/CancelarPedido.java"
  },
  {
    "slug": "koracrm",
    "name": "KoraCRM",
    "oneLine": "CRM em Laravel com funil, tarefas e auditoria",
    "what": "Sistema para organizar leads, acompanhar o funil comercial e registrar tarefas e alterações por usuário.",
    "role": "Desenvolvi a API em camadas, as regras de domínio e a interface React.",
    "highlights": [
      "Casos de uso separados do Eloquent",
      "Perfis de acesso e auditoria de alterações",
      "Testes de domínio, integração e navegador"
    ],
    "stack": [
      "PHP 8.2",
      "Laravel 11",
      "React 18",
      "Sanctum",
      "MySQL 8",
      "Redis",
      "Pest",
      "PHPStan",
      "Docker"
    ],
    "github": "https://github.com/fabriciojunio/KoraCRM",
    "demo": "https://koracrm-frontend.vercel.app",
    "year": "2026",
    "snippetLang": "php",
    "snippet": "    public function executar(CriarLeadDTO $dto): Lead\n    {\n        return DB::transaction(function () use ($dto) {\n            $lead = $this->repositorio->criar([\n                'nome' => $dto->nome,\n                'email' => $dto->email,\n                'telefone' => $dto->telefone,\n                'empresa' => $dto->empresa,\n                'cargo' => $dto->cargo,\n                'estagio' => 'novo',\n                'valor_estimado' => $dto->valorEstimado,\n                'origem' => $dto->origem,\n                'observacoes' => $dto->observacoes,\n                'tags' => $dto->tags,\n                'responsavel_id' => $dto->responsavelId,\n                'criado_por' => $dto->criadoPor,\n            ]);\n\n            $this->historico->registrar(\n                $lead->id,\n                $dto->criadoPor,\n                'criacao',\n                \"Lead {$lead->nome} criado no estágio 'novo'\",\n            );\n\n            return $lead;\n        });\n    }",
    "demoNote": "Interface com dados de exemplo no navegador. A API Laravel não está publicada.",
    "flow": [
      "Clique em Entrar como demonstração.",
      "Abra um lead, percorra o funil e consulte as tarefas.",
      "Consulte o repositório para executar a API e os testes."
    ],
    "idePath": "/projetos/koracrm.php",
    "sourcePath": "backend/app/Application/Services/CriarLeadService.php"
  },
  {
    "slug": "authcore",
    "name": "AuthCore",
    "oneLine": "Autenticação em Node.js com JWT, 2FA e perfis",
    "what": "API de autenticação com rotação de tokens, controle de acesso, Redis e uma interface React.",
    "role": "Implementei os fluxos de autenticação, autorização e renovação de sessão.",
    "highlights": [
      "JWT HS256 e autenticação TOTP",
      "Rotação de refresh tokens e detecção de reutilização",
      "Validação de entradas e testes de autenticação"
    ],
    "stack": [
      "Node.js",
      "Express",
      "TypeORM",
      "JWT + 2FA",
      "Docker"
    ],
    "github": "https://github.com/fabriciojunio/authcore",
    "demo": "https://frontend-tan-mu-38.vercel.app",
    "year": "2026",
    "snippetLang": "typescript",
    "snippet": "  verifyAccessToken(token: string): TokenPayload {\n    try {\n      const decoded = jwt.verify(token, config.security.jwt.accessSecret, {\n        algorithms: ['HS256'],\n        issuer: config.app.name,\n        audience: 'api',\n      }) as TokenPayload;\n\n      if (decoded.type !== 'access') {\n        throw new AuthenticationError('Invalid token type');\n      }\n\n      return decoded;\n    } catch (error) {\n      if (error instanceof jwt.TokenExpiredError) {\n        throw new AuthenticationError('Token expired');\n      }\n      if (error instanceof jwt.JsonWebTokenError) {\n        throw new AuthenticationError('Invalid token');\n      }\n      throw error;\n    }\n  }",
    "demoNote": "Interface publicada; a disponibilidade dos fluxos depende da API. O ambiente completo pode ser executado localmente.",
    "flow": [
      "Explore as telas de acesso e recuperação.",
      "Consulte no repositório os fluxos de renovação, 2FA e autorização.",
      "Execute o ambiente local para avaliar o backend completo."
    ],
    "idePath": "/projetos/authcore.ts",
    "sourcePath": "backend/src/services/token.service.ts"
  },
  {
    "slug": "codereview-ai",
    "name": "CodeReview AI",
    "oneLine": "Revisão de código com processamento assíncrono",
    "what": "Projeto de análise de código com modelo local, fila RabbitMQ e cache Redis.",
    "role": "Desenvolvi a orquestração assíncrona, o acompanhamento das análises e o cache por conteúdo.",
    "highlights": [
      "Spring Boot e fila de processamento",
      "Cache por hash do código enviado",
      "Rastreamento de requisições e testes automatizados"
    ],
    "stack": [
      "Java 21",
      "Spring Boot",
      "Ollama",
      "RabbitMQ",
      "Redis",
      "OpenTelemetry"
    ],
    "github": "https://github.com/fabriciojunio/codereview-ai",
    "demo": null,
    "year": "2026",
    "snippetLang": "java",
    "snippet": "    @Transactional\n    public ReviewResponse submit(ReviewRequest request, String userEmail) {\n        User user = findUser(userEmail);\n        checkRateLimit(user);\n        validateLineCount(request.sourceCode());\n\n        Review review = Review.builder()\n                .user(user)\n                .language(request.language())\n                .sourceCode(request.sourceCode())\n                .sourceFilename(request.filename())\n                .status(Review.ReviewStatus.PENDING)\n                .build();\n\n        Review persisted = reviewRepository.save(review);\n        incrementRateLimit(user);\n        reviewProducer.send(persisted.getId());\n\n        meterRegistry.counter(\"codereview.reviews.submitted\",\n                \"language\", request.language().name()).increment();\n\n        log.info(\"Review {} submitted by {} for {}\", persisted.getId(), userEmail, request.language());\n        return ReviewResponse.pending(persisted.getId(), request.language(), persisted.getSubmittedAt());\n    }",
    "demoNote": "Não há demonstração web publicada. O repositório contém instruções para execução local.",
    "flow": [
      "Abra o repositório e siga as instruções de execução.",
      "Envie um trecho de código e acompanhe o identificador da análise.",
      "Consulte o exemplo na IDE para entender o fluxo."
    ],
    "idePath": "/projetos/codereview-ai.java",
    "sourcePath": "backend/src/main/java/com/fabriciojunio/codereview/service/ReviewService.java"
  },
  {
    "slug": "conectagente",
    "name": "ConectAgente",
    "oneLine": "Visitas domiciliares com registro offline e sincronização",
    "what": "Projeto de iniciação científica para Agentes Comunitários de Saúde. App de campo em React Native e Expo, com SQLite local, Supabase/PostgreSQL e painel Next.js. Selecionado pela incubadora Saruê, da UNESP Bauru.",
    "role": "Desenvolvo o cadastro, as visitas, a sincronização e os perfis de acesso, com registros de auditoria.",
    "highlights": [
      "SQLite para registro em campo sem conexão",
      "Sincronização e acesso por perfil",
      "Painel de gestão e trilha de auditoria"
    ],
    "stack": [
      "React Native",
      "Expo SDK 54",
      "SQLite",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "Zod"
    ],
    "github": "https://github.com/fabriciojunio/ConectAgente",
    "demo": "https://conectagente-web.vercel.app",
    "year": "2026",
    "snippetLang": "typescript",
    "snippet": "  async contarPendentes(): Promise<number> {\n    return syncQueueRepository.contarPendentes();\n  }",
    "demoNote": "Projeto em desenvolvimento. O painel web requer acesso autorizado; não use dados reais de saúde na demonstração.",
    "flow": [
      "Consulte no repositório a arquitetura mobile e web.",
      "O painel administrativo requer uma conta autorizada.",
      "Avalie offline e sincronização no ambiente local com dados fictícios."
    ],
    "idePath": "/projetos/conectagente.ts",
    "sourcePath": "ConectAgente-mobile/src/services/syncService.ts"
  },
  {
    "slug": "permaneia",
    "name": "PermaneIA",
    "oneLine": "Assistente de estudos e análise de evasão",
    "what": "Projeto acadêmico com consulta a documentos por RAG e análise de fatores de evasão por lógica fuzzy.",
    "role": "Desenvolvi a inferência fuzzy e a consulta a documentos com fontes citadas.",
    "highlights": [
      "Consulta a material acadêmico",
      "Motor fuzzy de Mamdani",
      "Simulação interativa dos fatores de risco"
    ],
    "stack": [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Gemini API"
    ],
    "github": "https://github.com/fabriciojunio/permaneia",
    "labDemo": "/projetos/permaneia.ts",
    "demo": "https://permaneia.vercel.app",
    "year": "2026",
    "snippetLang": "typescript",
    "snippet": "// Regra 7: o caso que o projeto existe para pegar.\n// Notas boas não anulam presença e engajamento em queda.\nr(7, \"baixa\", \"alta\", \"baixo\", \"alto\",\n  \"Um critério baseado só em nota classificaria este aluno \" +\n  \"como tranquilo, e ele não está.\");\n\n// Disparo pelo mínimo: a regra só vale o quanto vale o seu\n// antecedente mais fraco.\nconst forca = Math.min(\n  graus.frequencia[regra.se.frequencia],\n  graus.notas[regra.se.notas],\n  graus.engajamento[regra.se.engajamento],\n);",
    "demoNote": "A simulação da IDE demonstra a lógica fuzzy com entradas de exemplo; não é uma previsão validada para alunos reais.",
    "flow": [
      "Abra a simulação na IDE.",
      "Altere os fatores e observe a inferência fuzzy.",
      "Consulte o repositório para executar a aplicação completa."
    ],
    "idePath": "/projetos/permaneia.ts"
  },
  {
    "slug": "cardiocam",
    "name": "Cardiocam",
    "oneLine": "Pesquisa de sinais cardíacos por vídeo",
    "what": "Projeto acadêmico de processamento de imagens e sinais para estudar rPPG, qualidade do sinal e comparação de métodos.",
    "role": "Desenvolvo o processamento, a avaliação e os testes da ferramenta experimental.",
    "highlights": [
      "Métodos clássicos e avaliação de qualidade",
      "Ferramentas de pesquisa e processamento de vídeo",
      "Testes automatizados em Linux e Windows"
    ],
    "stack": [
      "Python",
      "OpenCV",
      "NumPy",
      "SciPy",
      "JavaScript"
    ],
    "github": "https://github.com/fabriciojunio/cardiocam",
    "labDemo": "/projetos/cardiocam.py",
    "demo": null,
    "year": "2026",
    "snippetLang": "python",
    "snippet": "# Cardiocam (POS): projeção no plano ortogonal ao tom de pele\nPROJECAO = np.array([[0.0, 1.0, -1.0], [-2.0, 1.0, 1.0]])\n\ndef combinar(bloco):\n    # Variação só de intensidade anda na direção do tom de pele,\n    # e ao projetar no plano ortogonal ela desaparece.\n    normalizado = bloco / bloco.mean(axis=1, keepdims=True)\n    projetado = PROJECAO @ normalizado\n\n    alfa = np.std(projetado[0]) / np.std(projetado[1])\n    return projetado[0] + alfa * projetado[1]",
    "demoNote": "A IDE usa sinais sintéticos para comparar GREEN e POS. Não processa sua câmera e não fornece diagnóstico ou medição clínica validada.",
    "flow": [
      "Abra a simulação de sinais na IDE.",
      "Altere o ruído e a iluminação para comparar os métodos.",
      "Consulte o repositório e a documentação para executar a ferramenta de pesquisa."
    ],
    "idePath": "/projetos/cardiocam.py"
  },
  {
    "slug": "baliza",
    "name": "Baliza",
    "oneLine": "Ocupação de vagas por processamento de imagens",
    "what": "Trabalho em equipe de Visão Computacional para analisar vagas de estacionamento em imagens de câmera fixa.",
    "role": "Participei do processamento, da avaliação dos detectores e da documentação experimental.",
    "highlights": [
      "Detector clássico e comparação com YOLO",
      "Mapas de vagas e avaliação por câmera",
      "Demonstração local com imagens do PKLot"
    ],
    "stack": [
      "Python",
      "YOLO11",
      "OpenCV",
      "Streamlit",
      "PKLot"
    ],
    "github": "https://github.com/fabriciojunio/baliza",
    "demo": null,
    "year": "2026",
    "snippetLang": "python",
    "snippet": "# O detector geral enxerga o carro; o treinado enxerga a vaga.\n# Em pátio fotografado de longe o carro tem vinte pixels e o\n# geral simplesmente não o vê, por isso cada mapa guarda o seu.\ndef carregar(mapa: MapaDeVagas) -> Detector:\n    if mapa.detector == \"vagas\" and PESOS_VAGAS.exists():\n        return DetectorDeVagas(PESOS_VAGAS)\n    # sem os pesos treinados, cair no geral é melhor que falhar\n    return DetectorDeVeiculos(PESOS_COCO)",
    "demoNote": "A demonstração é local e usa imagens de estacionamento; não há processamento web publicado.",
    "flow": [
      "Leia o roteiro no repositório.",
      "Execute o pacote de demonstração e selecione uma câmera.",
      "Compare os detectores e as limitações nos resultados documentados."
    ],
    "idePath": "/projetos/baliza.py"
  },
  {
    "slug": "contaflux",
    "name": "Contaflux",
    "oneLine": "Contagem de veículos em vídeo de câmera fixa",
    "what": "Trabalho em equipe de Processamento de Imagens e Sinais com rastreamento e contagem por cruzamento de linha.",
    "role": "Participei do processamento de vídeo, da contagem e da avaliação dos cenários de demonstração.",
    "highlights": [
      "Contagem por sentido",
      "Rastreamento quadro a quadro",
      "Executável e exemplos para avaliação local"
    ],
    "stack": [
      "Python",
      "OpenCV",
      "NumPy",
      "YOLO11",
      "PyInstaller"
    ],
    "github": "https://github.com/fabriciojunio/contaflux",
    "labDemo": "/projetos/contaflux.py",
    "demo": null,
    "year": "2026",
    "snippetLang": "python",
    "snippet": "# Contaflux: de que lado da linha o veículo está\ndef lado(self, ponto: tuple[float, float]) -> float:\n    # O sinal do produto vetorial diz o lado; a troca de sinal entre\n    # dois quadros significa que a linha foi atravessada no intervalo.\n    return (self.x2 - self.x1) * (ponto[1] - self.y1) - (\n        self.y2 - self.y1\n    ) * (ponto[0] - self.x1)",
    "demoNote": "A IDE simula veículos cruzando uma linha. O processamento de vídeo real ocorre na aplicação Python.",
    "flow": [
      "Abra a simulação de cruzamento na IDE.",
      "Observe a contagem por sentido.",
      "No repositório, baixe o executável ou execute com um vídeo de câmera fixa."
    ],
    "idePath": "/projetos/contaflux.py"
  },
  {
    "slug": "kaida",
    "name": "Kaida: Raízes do Esquecimento",
    "oneLine": "Jogo acadêmico 2D em Unity",
    "what": "Metroidvania com estados do jogador, habilidades, dificuldade e ferramentas de editor para montar cenas.",
    "role": "Desenvolvi o controlador do jogador, o chefe e as ferramentas de montagem do jogo.",
    "highlights": [
      "Máquina de estados em C#",
      "Coyote time e buffer de pulo",
      "Build Windows e testes Unity"
    ],
    "stack": [
      "Unity 2022.3",
      "C#",
      "Unity Test Framework"
    ],
    "github": "https://github.com/fabriciojunio/kaida",
    "labDemo": "/projetos/kaida.cs",
    "demo": null,
    "year": "2026",
    "snippetLang": "csharp",
    "snippet": "// Kaida: o pulo perdoa o erro de alguns quadros\nvoid TickTimers(float dt)\n{\n    coyoteTimer = Mathf.Max(0f, coyoteTimer - dt);\n    jumpBufferTimer = Mathf.Max(0f, jumpBufferTimer - dt);\n}\n\n// Comando dado no ar, pouco antes de encostar no chão, espera.\npublic void BufferJump() { jumpBufferTimer = stats.jumpBufferTime; }\n\npublic bool ConsumeJumpBuffer()\n{\n    if (jumpBufferTimer > 0f) { jumpBufferTimer = 0f; return true; }\n    return false;\n}",
    "demoNote": "A IDE demonstra a física do salto. Para jogar, baixe o build nas releases do repositório.",
    "flow": [
      "Experimente a simulação do salto na IDE.",
      "Baixe o build Windows nas releases.",
      "Consulte os estados e os testes no repositório."
    ],
    "idePath": "/projetos/kaida.cs"
  },
  {
    "slug": "bicudo",
    "name": "Bicudo",
    "oneLine": "Jogo acadêmico de um botão em Unity",
    "what": "Jogo 2D com impulso, obstáculos, pontuação e ajuste do cenário à largura da tela.",
    "role": "Desenvolvi o jogo, a montagem da cena e os testes.",
    "highlights": [
      "Impulso e colisões em C#",
      "Cenário adaptado ao tamanho da tela",
      "Testes da lógica e da cena"
    ],
    "stack": [
      "Unity 2022.3",
      "C#",
      "Unity Test Framework"
    ],
    "github": "https://github.com/fabriciojunio/bicudo",
    "labDemo": "/projetos/bicudo.cs",
    "demo": null,
    "year": "2026",
    "snippetLang": "csharp",
    "snippet": "// Bicudo: o impulso troca a velocidade, não soma a ela\npublic void Bater()\n{\n    // troca seca: subir sempre a mesma altura, venha de onde vier\n    VelocidadeVertical = impulso;\n}\n\nvoid Update()\n{\n    VelocidadeVertical -= gravidade * Time.deltaTime;\n    VelocidadeVertical = Mathf.Max(VelocidadeVertical, -quedaMaxima);\n    transform.position += Vector3.up * VelocidadeVertical * Time.deltaTime;\n}",
    "demoNote": "A IDE demonstra o impulso do personagem. O jogo completo é executado pelo build Unity.",
    "flow": [
      "Experimente o impulso na IDE.",
      "Consulte as releases para jogar.",
      "Confira a lógica e os testes no repositório."
    ],
    "idePath": "/projetos/bicudo.cs"
  },
  {
    "slug": "laboratorio-vr",
    "name": "Laboratório VR",
    "oneLine": "Laboratório de química em realidade virtual",
    "what": "Projeto acadêmico em Unity com interação pelo olhar, teleporte e suporte a Google Cardboard.",
    "role": "Desenvolvi a interação por gaze, o teleporte e o controle de câmera.",
    "highlights": [
      "Raycast para interação pelo olhar",
      "Teleporte por tempo de permanência",
      "Build Android"
    ],
    "stack": [
      "Unity",
      "C#",
      "Google Cardboard",
      "Android"
    ],
    "github": "https://github.com/fabriciojunio/LaboratorioVR",
    "demo": null,
    "year": "2026",
    "snippetLang": "csharp",
    "snippet": "// Laboratório VR: ponto de teleporte ativado por gaze (olhar)\npublic class TeleportPoint : MonoBehaviour\n{\n    public float tempoOlhar = 2f;\n    private float timer = 0f;\n\n    public void IniciarOlhar()\n    {\n        timer += Time.deltaTime;\n        float progresso = timer / tempoOlhar;\n        rend.material.color = Color.Lerp(corOriginal, Color.green, progresso);\n        if (timer >= tempoOlhar) Teleportar();\n    }\n\n    public void PararOlhar()\n    {\n        timer = 0f;\n        rend.material.color = corOriginal;\n    }\n}",
    "demoNote": "Projeto Unity para avaliação local ou em dispositivo Android; não há demonstração web publicada.",
    "flow": [
      "Abra o repositório e as instruções.",
      "Execute no Unity ou no dispositivo compatível.",
      "Observe a interação pelo olhar e os pontos de teleporte."
    ],
    "idePath": "/projetos/laboratorio-vr.cs"
  },
  {
    "slug": "jis",
    "name": "JIS",
    "oneLine": "Agregador de vagas com filtros e pontuação",
    "what": "Projeto em Next.js que reúne fontes de vagas e aplica filtros de tecnologias, região e senioridade.",
    "role": "Desenvolvi a coleta, os filtros e a pontuação de aderência.",
    "highlights": [
      "Filtros de stack e localização",
      "Cache de consultas e funil local",
      "Simulação da pontuação na IDE"
    ],
    "stack": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Vitest"
    ],
    "github": "https://github.com/fabriciojunio/jis",
    "labDemo": "/projetos/jis.ts",
    "demo": "https://jis-vagas.vercel.app",
    "year": "2026",
    "snippetLang": "typescript",
    "snippet": "// Os três primeiros não são peso, são porta. Reprovou, nem pontua.\nif (vaga.senioridade === \"senior\" || vaga.senioridade === \"lead\") return null;\nif (vaga.regiao === \"outra\") return null;\nif (vaga.publicadaEmDias > DIAS_ATE_VIRAR_FANTASMA) return null;\n\nconst aderencia = proporcaoDeStack(vaga.stack);\nif (aderencia < ADERENCIA_MINIMA) return null;\n\nconst recencia = 1 - vaga.publicadaEmDias / DIAS_ATE_VIRAR_FANTASMA;\nreturn Math.round(100 * (0.65 * aderencia + 0.35 * recencia));",
    "demoNote": "A pontuação é uma heurística de aderência, não uma probabilidade de contratação.",
    "flow": [
      "Explore os filtros na aplicação.",
      "Na IDE, altere as entradas da pontuação.",
      "Consulte os critérios e as fontes no repositório."
    ],
    "idePath": "/projetos/jis.ts"
  },
  {
    "slug": "outorga",
    "name": "Outorga TV",
    "oneLine": "Streaming com catálogo, licenças e isolamento entre clientes",
    "what": "Projeto Java para organizar catálogos de conteúdo com controle de licenças e identidade por cliente.",
    "role": "Desenvolvi serviços de catálogo, controle de acesso e regras de licenciamento.",
    "highlights": [
      "Spring Boot e controle de acesso",
      "Licenças com validade e publicação condicionada",
      "Isolamento de dados por cliente"
    ],
    "stack": [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "JdbcClient",
      "Next.js"
    ],
    "github": "https://github.com/fabriciojunio/outorga-tv",
    "demo": "https://outorga-tv.vercel.app",
    "demoAcesso": "espectador@exemplo.com / demonstracao2026",
    "year": "2026",
    "snippetLang": "java",
    "snippet": "// A licença entra por parâmetro, e não por consulta interna.\n// Quem chama é obrigado a tê-la em mãos: não há como publicar sem.\npublic Result<Titulo> publicar(Licenca licenca, Instant agora) {\n    if (!licenca.cobre(this.territorio, agora))\n        return Result.erro(FalhaDeNegocio.SEM_LICENCA_VIGENTE);\n    return Result.ok(comStatus(Status.PUBLICADO));\n}",
    "demoNote": "Projeto complementar. Consulte no repositório o roteiro e as condições da demonstração.",
    "flow": [
      "Explore a documentação e o catálogo de demonstração.",
      "Consulte as regras de licença e publicação.",
      "Execute o ambiente local para avaliar os serviços."
    ],
    "idePath": "/projetos/outorga.java"
  },
  {
    "slug": "paiol-tech",
    "name": "Paiol Tech",
    "oneLine": "Gestão de dívidas rurais em um monorepo TypeScript",
    "what": "Projeto com aplicação Next.js, API NestJS e organização de dívidas, vencimentos e notificações.",
    "role": "Desenvolvi o domínio de dívidas, os casos de uso e os adaptadores de integração.",
    "highlights": [
      "NestJS, CQRS e Prisma",
      "Separação entre domínio e provedores externos",
      "Mocks locais para WhatsApp, pagamentos e Open Finance"
    ],
    "stack": [
      "Next.js 15",
      "NestJS",
      "CQRS",
      "Turborepo",
      "PWA"
    ],
    "github": "https://github.com/fabriciojunio/paiol-tech",
    "demo": "https://paiol-tech.vercel.app",
    "year": "2026",
    "snippetLang": "typescript",
    "snippet": "@CommandHandler(DebtDueCommand)\nexport class DebtDueHandler implements ICommandHandler<DebtDueCommand> {\n  async execute(cmd: DebtDueCommand): Promise<void> {\n    const debt = await this.debts.byId(cmd.debtId);\n    debt.markDue();                  // emite DebtMarkedDueEvent\n    await this.debts.save(debt);\n    await this.notify.whatsapp({ /* ... */ });\n  }\n}",
    "demoNote": "Projeto complementar. Integrações externas usam adaptadores e mocks no desenvolvimento; não representa operação bancária real.",
    "flow": [
      "Explore a aplicação e os vencimentos.",
      "Consulte os adaptadores e o roteiro local.",
      "Avalie as integrações com os provedores configurados no ambiente."
    ],
    "idePath": "/projetos/paiol-tech.ts"
  }
];

export const PROJETOS_EIXO = PROJECTS_SOURCE.filter(p => [
  "almanaque",
  "vitrine-bauru",
  "feira",
  "koracrm",
  "authcore",
  "codereview-ai"
].includes(p.slug));
export const PROJETOS_PARCERIA = PROJECTS_SOURCE.filter(p => [
  "conectagente"
].includes(p.slug));
export const PROJETOS_ACERVO = PROJECTS_SOURCE.filter(p => [
  "permaneia",
  "cardiocam",
  "baliza",
  "contaflux",
  "kaida",
  "bicudo",
  "laboratorio-vr",
  "jis",
  "outorga",
  "paiol-tech"
].includes(p.slug));
export const PROJECTS = [...PROJETOS_EIXO, ...PROJETOS_PARCERIA, ...PROJETOS_ACERVO];
export const SOBRE = {
  "nome": "Fabrício Júnio",
  "cargo": "Analista de Sistemas",
  "cidade": "Bauru, SP",
  "bio": "Desenvolvimento, integrações e sustentação de software. Java, JavaScript e SQL no trabalho; PHP, Symfony e Laravel em projetos próprios.",
  "longBio": [
    "Sou Analista de Sistemas na DIGIHUB Tecnologia. Trabalho com robôs Java, integrações REST, regras JavaScript, SQL e processos na Lecom BPM, com automação RPA no Roberty Studio.",
    "Analiso chamados, investigo código e banco de dados, implemento correções e acompanho a homologação e a publicação. Utilizo Jira, Git e GitLab no acompanhamento das entregas.",
    "Na Nexum Tecnologia, atuei em processos do setor financeiro, integrações com APIs externas e MCP. Em projetos próprios, desenvolvo também com PHP, Symfony e Laravel, com testes e integração contínua.",
    "Curso Ciência da Computação na UNISAGRADO. Participo de iniciação científica em saúde pública com o ConectAgente, selecionado pela incubadora Saruê da UNESP Bauru. IA e processamento de imagens fazem parte dos meus estudos e projetos acadêmicos."
  ],
  "contato": {
    "email": "junioad555@gmail.com",
    "github": "https://github.com/fabriciojunio",
    "linkedin": "https://www.linkedin.com/in/fabr%C3%ADcioj%C3%BAnio/"
  }
};
export const STACK_GROUPS = [
  {
    "label": "trabalho",
    "items": [
      "Java",
      "JavaScript",
      "SQL",
      "MySQL",
      "Lecom BPM",
      "Roberty Studio",
      "RPA"
    ]
  },
  {
    "label": "integracoes",
    "items": [
      "API REST",
      "MCP",
      "Jira",
      "Git",
      "GitLab"
    ]
  },
  {
    "label": "backend",
    "items": [
      "PHP",
      "Symfony",
      "Laravel",
      "Spring Boot",
      "Node.js",
      "Doctrine ORM"
    ]
  },
  {
    "label": "interface",
    "items": [
      "Twig",
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo"
    ]
  },
  {
    "label": "dados",
    "items": [
      "MySQL",
      "PostgreSQL",
      "SQLite",
      "Elasticsearch",
      "Redis"
    ]
  },
  {
    "label": "qualidade",
    "items": [
      "PHPUnit",
      "Playwright",
      "PHPStan",
      "Docker",
      "Nginx",
      "GitHub Actions"
    ]
  },
  {
    "label": "pesquisa",
    "items": [
      "Python",
      "OpenCV",
      "Aprendizado de máquina",
      "RAG",
      "Processamento de sinais"
    ]
  }
];
export const EMPRESAS = [
  "Java",
  "PHP",
  "JavaScript",
  "SQL",
  "Integrações",
  "Automação",
  "Sustentação"
];
