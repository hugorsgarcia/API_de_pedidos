const fastify = require('fastify')({ 
  logger: true 
});

// Registrar plugin para CORS
fastify.register(require('@fastify/cors'), {
  origin: true
});

// Registrar Swagger
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'Sistema de Gerenciamento de Pedidos API',
      description: 'API completa para gerenciamento de pedidos, produtos, clientes e marcas desenvolvida com Node.js, MySQL e Knex.js',
      version: '1.0.0',
      contact: {
        name: 'Hugo Garcia',
        email: 'hugo@email.com'
      }
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Sistema', description: 'Informações gerais do sistema' },
      { name: 'Marcas', description: 'Operações relacionadas às marcas' },
      { name: 'Produtos', description: 'Operações relacionadas aos produtos' },
      { name: 'Clientes', description: 'Operações relacionadas aos clientes' },
      { name: 'Pedidos', description: 'Operações relacionadas aos pedidos' }
    ]
  }
});

// Registrar Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

// Registrar rotas
fastify.register(require('./routes/marcas'), { prefix: '/marcas' });
fastify.register(require('./routes/produtos'), { prefix: '/produtos' });
fastify.register(require('./routes/clientes'), { prefix: '/clientes' });
fastify.register(require('./routes/pedidos'), { prefix: '/pedidos' });

// Rota de health check
fastify.get('/', {
  schema: {
    tags: ['Sistema'],
    summary: 'Health Check',
    description: 'Verifica se a API está funcionando corretamente',
    response: {
      200: {
        description: 'API funcionando corretamente',
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              version: { type: 'string' },
              timestamp: { type: 'string', format: 'date-time' }
            }
          },
          error: { type: 'boolean' }
        }
      }
    }
  }
}, async (request, reply) => {
  return { 
    message: 'Sistema de Pedidos API está funcionando!',
    data: {
      version: '1.0.0',
      timestamp: new Date().toISOString()
    },
    error: false
  };
});

// Rota para listar todas as rotas disponíveis
fastify.get('/routes', {
  schema: {
    tags: ['Sistema'],
    summary: 'Lista todas as rotas',
    description: 'Retorna uma lista com todas as rotas disponíveis na API',
    response: {
      200: {
        description: 'Lista de rotas retornada com sucesso',
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                method: { type: 'string' },
                path: { type: 'string' },
                description: { type: 'string' }
              }
            }
          },
          error: { type: 'boolean' }
        }
      }
    }
  }
}, async (request, reply) => {
  const routes = [
    { method: 'GET', path: '/docs', description: 'Documentação Swagger da API' },
    { method: 'GET', path: '/', description: 'Health check da API' },
    { method: 'GET', path: '/routes', description: 'Lista todas as rotas disponíveis' },
    { method: 'GET', path: '/marcas', description: 'Lista todas as marcas' },
    { method: 'GET', path: '/marcas/:id', description: 'Lista marca por ID' },
    { method: 'DELETE', path: '/marcas/:id', description: 'Remove marca por ID' },
    { method: 'GET', path: '/produtos', description: 'Lista todos os produtos' },
    { method: 'GET', path: '/produtos/:id', description: 'Lista produto por ID' },
    { method: 'POST', path: '/produtos', description: 'Cadastra produto' },
    { method: 'GET', path: '/clientes', description: 'Lista todos os clientes' },
    { method: 'GET', path: '/clientes/:id', description: 'Lista cliente por ID' },
    { method: 'POST', path: '/clientes', description: 'Cadastra cliente' },
    { method: 'GET', path: '/pedidos', description: 'Lista todos os pedidos com itens' },
    { method: 'GET', path: '/pedidos/:id', description: 'Lista pedido por ID com itens' },
    { method: 'GET', path: '/pedidos/cidade/:cidade', description: 'Lista pedidos por cidade com itens' },
    { method: 'POST', path: '/pedidos', description: 'Cadastra novo pedido com itens' }
  ];

  return { 
    message: 'Rotas disponíveis na API',
    data: routes,
    error: false
  };
});

// Handler para rotas não encontradas
fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({
    message: 'Rota não encontrada',
    data: null,
    error: true
  });
});

// Handler global para erros
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    message: 'Erro interno do servidor',
    data: null,
    error: true
  });
});

// Função para iniciar o servidor
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Documentação Swagger em http://localhost:${PORT}/docs`);
    console.log(`📋 Lista de rotas em http://localhost:${PORT}/routes`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
