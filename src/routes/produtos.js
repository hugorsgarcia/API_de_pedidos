const ProdutoController = require('../controllers/ProdutoController');

async function produtoRoutes(fastify, options) {
  // GET /produtos - Lista todos os produtos
  fastify.get('/', ProdutoController.index);
  
  // GET /produtos/:id - Lista produto por ID
  fastify.get('/:id', ProdutoController.show);
  
  // POST /produtos - Cadastra produto
  fastify.post('/', ProdutoController.store);
}

module.exports = produtoRoutes;
