const db = require('../database/connection');

class ProdutoController {
  // GET /produtos - Lista todos os produtos
  async index(request, reply) {
    try {
      const produtos = await db('produtos')
        .select(
          'produtos.id',
          'produtos.nome',
          'produtos.preco',
          'produtos.descricao',
          'produtos.estoque',
          'produtos.created_at',
          'produtos.updated_at',
          'marcas.nome as marca_nome',
          'marcas.id as marca_id'
        )
        .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
        .orderBy('produtos.nome');
      
      return reply.status(200).send({
        message: 'Produtos listados com sucesso',
        data: produtos,
        error: false
      });
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        data: null,
        error: true
      });
    }
  }

  // GET /produtos/:id - Lista produto por ID
  async show(request, reply) {
    try {
      const { id } = request.params;
      const produto = await db('produtos')
        .select(
          'produtos.id',
          'produtos.nome',
          'produtos.preco',
          'produtos.descricao',
          'produtos.estoque',
          'produtos.created_at',
          'produtos.updated_at',
          'marcas.nome as marca_nome',
          'marcas.id as marca_id'
        )
        .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
        .where('produtos.id', id)
        .first();
      
      if (!produto) {
        return reply.status(404).send({
          message: 'Produto não encontrado',
          data: null,
          error: true
        });
      }

      return reply.status(200).send({
        message: 'Produto encontrado com sucesso',
        data: produto,
        error: false
      });
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        data: null,
        error: true
      });
    }
  }

  // POST /produtos - Cadastra novo produto
  async store(request, reply) {
    try {
      const { nome, preco, id_marca, descricao, estoque } = request.body;

      // Validações básicas
      if (!nome || !preco || !id_marca) {
        return reply.status(400).send({
          message: 'Nome, preço e marca são obrigatórios',
          data: null,
          error: true
        });
      }

      // Verificar se a marca existe
      const marca = await db('marcas').where('id', id_marca).first();
      if (!marca) {
        return reply.status(400).send({
          message: 'Marca não encontrada',
          data: null,
          error: true
        });
      }

      const [produtoId] = await db('produtos').insert({
        nome,
        preco: parseFloat(preco),
        id_marca: parseInt(id_marca),
        descricao: descricao || null,
        estoque: parseInt(estoque) || 0
      });

      const novoProduto = await db('produtos')
        .select(
          'produtos.id',
          'produtos.nome',
          'produtos.preco',
          'produtos.descricao',
          'produtos.estoque',
          'produtos.created_at',
          'produtos.updated_at',
          'marcas.nome as marca_nome'
        )
        .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
        .where('produtos.id', produtoId)
        .first();

      return reply.status(201).send({
        message: 'Produto cadastrado com sucesso',
        data: novoProduto,
        error: false
      });
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        data: null,
        error: true
      });
    }
  }
}

module.exports = new ProdutoController();
