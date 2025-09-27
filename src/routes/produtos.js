const ProdutoController = require('../controllers/ProdutoController');

async function produtoRoutes(fastify, options) {
  // GET /produtos - Lista todos os produtos
  fastify.get('/', {
    schema: {
      tags: ['Produtos'],
      summary: 'Lista todos os produtos',
      description: 'Retorna uma lista com todos os produtos cadastrados, incluindo informações da marca'
    }
  }, ProdutoController.index);
  
  // GET /produtos/:id - Lista produto por ID
  fastify.get('/:id', {
    schema: {
      tags: ['Produtos'],
      summary: 'Busca produto por ID',
      description: 'Retorna os dados de um produto específico pelo seu ID, incluindo informações da marca',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do produto a ser buscado' }
        },
        required: ['id']
      }
    }
  }, ProdutoController.show);
  
  // POST /produtos - Cadastra produto
  fastify.post('/', {
    schema: {
      tags: ['Produtos'],
      summary: 'Cadastra novo produto',
      description: 'Cria um novo produto no sistema. Valida se a marca existe e se os dados são válidos.',
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: 'Nome do produto' },
          preco: { type: 'number', description: 'Preço do produto', minimum: 0 },
          id_marca: { type: 'integer', description: 'ID da marca do produto' },
          descricao: { type: 'string', description: 'Descrição do produto (opcional)' },
          estoque: { type: 'integer', description: 'Quantidade em estoque (opcional, padrão: 0)', minimum: 0 }
        },
        required: ['nome', 'preco', 'id_marca']
      }
    }
  }, ProdutoController.store);
}

module.exports = produtoRoutes;
