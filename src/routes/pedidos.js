const PedidoController = require('../controllers/PedidoController');

async function pedidoRoutes(fastify, options) {
  // GET /pedidos - Lista todos os pedidos
  fastify.get('/', PedidoController.index);
  
  // GET /pedidos/:id - Lista pedido por ID
  fastify.get('/:id', {
    handler: PedidoController.show,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[0-9]+$' }
        }
      }
    }
  });
  
  // GET /pedidos/cidade/:cidade - Lista pedidos por cidade
  fastify.get('/cidade/:cidade', PedidoController.showByCidade);
  
  // POST /pedidos - Cadastra novo pedido
  fastify.post('/', PedidoController.store);
}

module.exports = pedidoRoutes;
