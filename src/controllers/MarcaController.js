const db = require('../database/connection');

class MarcaController {
  // GET /marcas - Lista todas as marcas
  async index(request, reply) {
    try {
      const marcas = await db('marcas').select('*').orderBy('nome');
      
      return reply.status(200).send({
        message: 'Marcas listadas com sucesso',
        data: marcas,
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

  // GET /marcas/:id - Lista marca por ID
  async show(request, reply) {
    try {
      const { id } = request.params;
      const marca = await db('marcas').where('id', id).first();
      
      if (!marca) {
        return reply.status(404).send({
          message: 'Marca não encontrada',
          data: null,
          error: true
        });
      }

      return reply.status(200).send({
        message: 'Marca encontrada com sucesso',
        data: marca,
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

  // DELETE /marcas/:id - Remove marca por ID
  async destroy(request, reply) {
    try {
      const { id } = request.params;
      
      // Verificar se a marca existe
      const marca = await db('marcas').where('id', id).first();
      if (!marca) {
        return reply.status(404).send({
          message: 'Marca não encontrada',
          data: null,
          error: true
        });
      }

      // Verificar se há produtos vinculados
      const produtosVinculados = await db('produtos').where('id_marca', id).count('id as total');
      if (produtosVinculados[0].total > 0) {
        return reply.status(400).send({
          message: 'Não é possível excluir marca com produtos vinculados',
          data: null,
          error: true
        });
      }

      await db('marcas').where('id', id).del();
      
      return reply.status(200).send({
        message: 'Marca removida com sucesso',
        data: null,
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

module.exports = new MarcaController();
