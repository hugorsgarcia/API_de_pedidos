const PedidoController = require('../controllers/PedidoController');

async function pedidoRoutes(fastify, options) {
  // GET /pedidos - Lista todos os pedidos
  fastify.get('/', {
    schema: {
      tags: ['Pedidos'],
      summary: 'Lista todos os pedidos',
      description: 'Retorna uma lista com todos os pedidos cadastrados, incluindo seus itens, dados do cliente e produtos'
    }
  }, PedidoController.index);
  
  // GET /pedidos/cidade/:cidade - Lista pedidos por cidade (deve vir antes da rota /:id)
  fastify.get('/cidade/:cidade', {
    schema: {
      tags: ['Pedidos'],
      summary: 'Lista pedidos por cidade',
      description: 'Retorna todos os pedidos de clientes de uma cidade específica, incluindo seus itens',
      params: {
        type: 'object',
        properties: {
          cidade: { type: 'string', description: 'Nome da cidade para filtrar os pedidos' }
        },
        required: ['cidade']
      }
    }
  }, PedidoController.showByCidade);
  
  // GET /pedidos/:id - Lista pedido por ID
  fastify.get('/:id', {
    schema: {
      tags: ['Pedidos'],
      summary: 'Busca pedido por ID',
      description: 'Retorna os dados completos de um pedido específico, incluindo todos os itens e dados do cliente',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do pedido a ser buscado' }
        },
        required: ['id']
      }
    }
  }, PedidoController.show);
  
  // POST /pedidos - Cadastra novo pedido
  fastify.post('/', {
    schema: {
      tags: ['Pedidos'],
      summary: 'Cadastra novo pedido',
      description: 'Cria um novo pedido com múltiplos itens. Valida estoque, calcula totais automaticamente e usa transações para garantir consistência.',
      body: {
        type: 'object',
        properties: {
          id_cliente: { type: 'integer', description: 'ID do cliente que está fazendo o pedido' },
          observacoes: { type: 'string', description: 'Observações sobre o pedido (opcional)' },
          itens: {
            type: 'array',
            description: 'Lista de itens do pedido',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                id_produto: { type: 'integer', description: 'ID do produto' },
                quantidade: { type: 'integer', minimum: 1, description: 'Quantidade do produto' }
              },
              required: ['id_produto', 'quantidade']
            }
          }
        },
        required: ['id_cliente', 'itens']
      }
    }
  }, PedidoController.store);
}

module.exports = pedidoRoutes;
