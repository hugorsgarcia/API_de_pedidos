const db = require('../database/connection');

class PedidoController {
  // GET /pedidos - Lista todos os pedidos com itens
  async index(request, reply) {
    try {
      const pedidos = await db('pedidos')
        .select(
          'pedidos.id',
          'pedidos.data',
          'pedidos.total',
          'pedidos.status',
          'pedidos.observacoes',
          'pedidos.created_at',
          'pedidos.updated_at',
          'clientes.nome as cliente_nome',
          'clientes.cidade as cliente_cidade',
          'clientes.email as cliente_email'
        )
        .leftJoin('clientes', 'pedidos.id_cliente', 'clientes.id')
        .orderBy('pedidos.data', 'desc');

      // Buscar itens para cada pedido
      for (let pedido of pedidos) {
        const itens = await db('itens_pedidos')
          .select(
            'itens_pedidos.id',
            'itens_pedidos.quantidade',
            'itens_pedidos.preco_unitario',
            'itens_pedidos.subtotal',
            'produtos.nome as produto_nome',
            'produtos.id as produto_id',
            'marcas.nome as marca_nome'
          )
          .leftJoin('produtos', 'itens_pedidos.id_produto', 'produtos.id')
          .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
          .where('itens_pedidos.id_pedido', pedido.id);
        
        pedido.itens = itens;
      }
      
      return reply.status(200).send({
        message: 'Pedidos listados com sucesso',
        data: pedidos,
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

  // GET /pedidos/:id - Lista pedido por ID com itens
  async show(request, reply) {
    try {
      const { id } = request.params;
      const pedido = await db('pedidos')
        .select(
          'pedidos.id',
          'pedidos.data',
          'pedidos.total',
          'pedidos.status',
          'pedidos.observacoes',
          'pedidos.created_at',
          'pedidos.updated_at',
          'clientes.nome as cliente_nome',
          'clientes.cidade as cliente_cidade',
          'clientes.email as cliente_email',
          'clientes.telefone as cliente_telefone',
          'clientes.endereco as cliente_endereco'
        )
        .leftJoin('clientes', 'pedidos.id_cliente', 'clientes.id')
        .where('pedidos.id', id)
        .first();
      
      if (!pedido) {
        return reply.status(404).send({
          message: 'Pedido não encontrado',
          data: null,
          error: true
        });
      }

      // Buscar itens do pedido
      const itens = await db('itens_pedidos')
        .select(
          'itens_pedidos.id',
          'itens_pedidos.quantidade',
          'itens_pedidos.preco_unitario',
          'itens_pedidos.subtotal',
          'produtos.nome as produto_nome',
          'produtos.id as produto_id',
          'marcas.nome as marca_nome'
        )
        .leftJoin('produtos', 'itens_pedidos.id_produto', 'produtos.id')
        .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
        .where('itens_pedidos.id_pedido', pedido.id);
      
      pedido.itens = itens;

      return reply.status(200).send({
        message: 'Pedido encontrado com sucesso',
        data: pedido,
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

  // GET /pedidos/cidade/:cidade - Lista pedidos por cidade com itens
  async showByCidade(request, reply) {
    try {
      const { cidade } = request.params;
      const pedidos = await db('pedidos')
        .select(
          'pedidos.id',
          'pedidos.data',
          'pedidos.total',
          'pedidos.status',
          'pedidos.observacoes',
          'pedidos.created_at',
          'pedidos.updated_at',
          'clientes.nome as cliente_nome',
          'clientes.cidade as cliente_cidade',
          'clientes.email as cliente_email'
        )
        .leftJoin('clientes', 'pedidos.id_cliente', 'clientes.id')
        .where('clientes.cidade', 'like', `%${cidade}%`)
        .orderBy('pedidos.data', 'desc');

      // Buscar itens para cada pedido
      for (let pedido of pedidos) {
        const itens = await db('itens_pedidos')
          .select(
            'itens_pedidos.id',
            'itens_pedidos.quantidade',
            'itens_pedidos.preco_unitario',
            'itens_pedidos.subtotal',
            'produtos.nome as produto_nome',
            'produtos.id as produto_id',
            'marcas.nome as marca_nome'
          )
          .leftJoin('produtos', 'itens_pedidos.id_produto', 'produtos.id')
          .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
          .where('itens_pedidos.id_pedido', pedido.id);
        
        pedido.itens = itens;
      }
      
      return reply.status(200).send({
        message: `Pedidos da cidade ${cidade} listados com sucesso`,
        data: pedidos,
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

  // POST /pedidos - Cadastra novo pedido com itens
  async store(request, reply) {
    const trx = await db.transaction();
    
    try {
      const { id_cliente, observacoes, itens } = request.body;

      // Validações básicas
      if (!id_cliente || !itens || !Array.isArray(itens) || itens.length === 0) {
        await trx.rollback();
        return reply.status(400).send({
          message: 'Cliente e itens são obrigatórios',
          data: null,
          error: true
        });
      }

      // Verificar se o cliente existe
      const cliente = await trx('clientes').where('id', id_cliente).first();
      if (!cliente) {
        await trx.rollback();
        return reply.status(400).send({
          message: 'Cliente não encontrado',
          data: null,
          error: true
        });
      }

      // Calcular total do pedido
      let totalPedido = 0;
      const itensValidados = [];

      for (let item of itens) {
        const { id_produto, quantidade } = item;
        
        if (!id_produto || !quantidade || quantidade <= 0) {
          await trx.rollback();
          return reply.status(400).send({
            message: 'Produto e quantidade são obrigatórios',
            data: null,
            error: true
          });
        }

        const produto = await trx('produtos').where('id', id_produto).first();
        if (!produto) {
          await trx.rollback();
          return reply.status(400).send({
            message: `Produto com ID ${id_produto} não encontrado`,
            data: null,
            error: true
          });
        }

        if (produto.estoque < quantidade) {
          await trx.rollback();
          return reply.status(400).send({
            message: `Estoque insuficiente para o produto ${produto.nome}`,
            data: null,
            error: true
          });
        }

        const subtotal = produto.preco * quantidade;
        totalPedido += subtotal;

        itensValidados.push({
          id_produto,
          quantidade,
          preco_unitario: produto.preco,
          subtotal
        });
      }

      // Criar o pedido
      const [pedidoId] = await trx('pedidos').insert({
        id_cliente,
        data: new Date(),
        total: totalPedido,
        status: 'pendente',
        observacoes: observacoes || null
      });

      // Inserir itens do pedido e atualizar estoque
      for (let item of itensValidados) {
        await trx('itens_pedidos').insert({
          id_pedido: pedidoId,
          ...item
        });

        // Atualizar estoque
        await trx('produtos')
          .where('id', item.id_produto)
          .decrement('estoque', item.quantidade);
      }

      await trx.commit();

      // Buscar o pedido completo para retorno
      const novoPedido = await db('pedidos')
        .select(
          'pedidos.id',
          'pedidos.data',
          'pedidos.total',
          'pedidos.status',
          'pedidos.observacoes',
          'pedidos.created_at',
          'pedidos.updated_at',
          'clientes.nome as cliente_nome',
          'clientes.cidade as cliente_cidade',
          'clientes.email as cliente_email'
        )
        .leftJoin('clientes', 'pedidos.id_cliente', 'clientes.id')
        .where('pedidos.id', pedidoId)
        .first();

      // Buscar itens do pedido
      const itensNovoPedido = await db('itens_pedidos')
        .select(
          'itens_pedidos.id',
          'itens_pedidos.quantidade',
          'itens_pedidos.preco_unitario',
          'itens_pedidos.subtotal',
          'produtos.nome as produto_nome',
          'produtos.id as produto_id',
          'marcas.nome as marca_nome'
        )
        .leftJoin('produtos', 'itens_pedidos.id_produto', 'produtos.id')
        .leftJoin('marcas', 'produtos.id_marca', 'marcas.id')
        .where('itens_pedidos.id_pedido', pedidoId);
      
      novoPedido.itens = itensNovoPedido;

      return reply.status(201).send({
        message: 'Pedido cadastrado com sucesso',
        data: novoPedido,
        error: false
      });
    } catch (error) {
      await trx.rollback();
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        data: null,
        error: true
      });
    }
  }
}

module.exports = new PedidoController();
