const fastify = require('fastify')({ 
  logger: true 
});

// Registrar plugin para CORS
fastify.register(require('@fastify/cors'), {
  origin: true
});

// Registrar rotas
fastify.register(require('./routes/marcas'), { prefix: '/marcas' });
fastify.register(require('./routes/produtos'), { prefix: '/produtos' });
fastify.register(require('./routes/clientes'), { prefix: '/clientes' });
fastify.register(require('./routes/pedidos'), { prefix: '/pedidos' });

// Rota de health check
fastify.get('/', async (request, reply) => {
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
fastify.get('/routes', async (request, reply) => {
  const routes = [
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
    console.log(`📚 Documentação em http://localhost:${PORT}/routes`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
