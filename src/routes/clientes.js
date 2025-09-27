const ClienteController = require('../controllers/ClienteController');

async function clienteRoutes(fastify, options) {
  // GET /clientes - Lista todos os clientes
  fastify.get('/', {
    schema: {
      tags: ['Clientes'],
      summary: 'Lista todos os clientes',
      description: 'Retorna uma lista com todos os clientes cadastrados no sistema'
    }
  }, ClienteController.index);
  
  // GET /clientes/:id - Lista cliente por ID
  fastify.get('/:id', {
    schema: {
      tags: ['Clientes'],
      summary: 'Busca cliente por ID',
      description: 'Retorna os dados de um cliente específico pelo seu ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do cliente a ser buscado' }
        },
        required: ['id']
      }
    }
  }, ClienteController.show);
  
  // POST /clientes - Cadastra cliente
  fastify.post('/', {
    schema: {
      tags: ['Clientes'],
      summary: 'Cadastra novo cliente',
      description: 'Cria um novo cliente no sistema. O email deve ser único.',
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: 'Nome completo do cliente' },
          email: { type: 'string', format: 'email', description: 'Email do cliente (deve ser único)' },
          cidade: { type: 'string', description: 'Cidade do cliente' },
          telefone: { type: 'string', description: 'Telefone do cliente (opcional)' },
          endereco: { type: 'string', description: 'Endereço completo do cliente (opcional)' }
        },
        required: ['nome', 'email', 'cidade']
      }
    }
  }, ClienteController.store);
}

module.exports = clienteRoutes;
