const ClienteController = require('../controllers/ClienteController');

async function clienteRoutes(fastify, options) {
  // GET /clientes - Lista todos os clientes
  fastify.get('/', ClienteController.index);
  
  // GET /clientes/:id - Lista cliente por ID
  fastify.get('/:id', ClienteController.show);
  
  // POST /clientes - Cadastra cliente
  fastify.post('/', ClienteController.store);
}

module.exports = clienteRoutes;
