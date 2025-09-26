const MarcaController = require('../controllers/MarcaController');

async function marcaRoutes(fastify, options) {
  // GET /marcas - Lista todas as marcas
  fastify.get('/', MarcaController.index);
  
  // GET /marcas/:id - Lista marca por ID
  fastify.get('/:id', MarcaController.show);
  
  // DELETE /marcas/:id - Remove marca por ID
  fastify.delete('/:id', MarcaController.destroy);
}

module.exports = marcaRoutes;
