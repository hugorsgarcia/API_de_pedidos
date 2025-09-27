const db = require('../database/connection');

class ClienteController {
  // GET /clientes - Lista todos os clientes
  async index(request, reply) {
    try {
      const clientes = await db('clientes').select('*').orderBy('nome');
      
      return reply.status(200).send({
        message: 'Clientes listados com sucesso',
        data: clientes,
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

  // GET /clientes/:id - Lista cliente por ID
  async show(request, reply) {
    try {
      const { id } = request.params;
      const cliente = await db('clientes').where('id', id).first();
      
      if (!cliente) {
        return reply.status(404).send({
          message: 'Cliente não encontrado',
          data: null,
          error: true
        });
      }

      return reply.status(200).send({
        message: 'Cliente encontrado com sucesso',
        data: cliente,
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

  // POST /clientes - Cadastra novo cliente
  async store(request, reply) {
    try {
      const { nome, email, cidade, telefone, endereco } = request.body;

      // Validações básicas
      if (!nome || !email || !cidade) {
        return reply.status(400).send({
          message: 'Nome, email e cidade são obrigatórios',
          data: null,
          error: true
        });
      }

      // Verificar se o email já existe
      const emailExiste = await db('clientes').where('email', email).first();
      if (emailExiste) {
        return reply.status(400).send({
          message: 'Email já cadastrado',
          data: null,
          error: true
        });
      }
      // Inserir novo cliente
      const [clienteId] = await db('clientes').insert({
        nome,
        email,
        cidade,
        telefone: telefone || null,
        endereco: endereco || null
      });

      const novoCliente = await db('clientes').where('id', clienteId).first();

      return reply.status(201).send({
        message: 'Cliente cadastrado com sucesso',
        data: novoCliente,
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

module.exports = new ClienteController();
