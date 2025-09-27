const MarcaController = require('../controllers/MarcaController');

async function marcaRoutes(fastify, options) {
  // GET /marcas - Lista todas as marcas
  fastify.get('/', {
    schema: {
      tags: ['Marcas'],
      summary: 'Lista todas as marcas',
      description: 'Retorna uma lista com todas as marcas cadastradas no sistema',
      response: {
        200: {
          description: 'Lista de marcas retornada com sucesso',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  nome: { type: 'string' },
                  pais: { type: 'string' },
                  descricao: { type: 'string' },
                  created_at: { type: 'string' },
                  updated_at: { type: 'string' }
                }
              }
            },
            error: { type: 'boolean' }
          }
        },
        500: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        }
      }
    }
  }, MarcaController.index);
  
  // GET /marcas/:id - Lista marca por ID
  fastify.get('/:id', {
    schema: {
      tags: ['Marcas'],
      summary: 'Busca marca por ID',
      description: 'Retorna os dados de uma marca específica pelo seu ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da marca a ser buscada' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Marca encontrada com sucesso',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                nome: { type: 'string' },
                pais: { type: 'string' },
                descricao: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
              }
            },
            error: { type: 'boolean' }
          }
        },
        404: {
          description: 'Marca não encontrada',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        },
        500: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        }
      }
    }
  }, MarcaController.show);
  
  // DELETE /marcas/:id - Remove marca por ID
  fastify.delete('/:id', {
    schema: {
      tags: ['Marcas'],
      summary: 'Remove marca por ID',
      description: 'Remove uma marca do sistema. Não é possível remover marcas que possuem produtos vinculados.',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID da marca a ser removida' }
        },
        required: ['id']
      },
      response: {
        200: {
          description: 'Marca removida com sucesso',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        },
        400: {
          description: 'Não é possível excluir marca com produtos vinculados',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        },
        404: {
          description: 'Marca não encontrada',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        },
        500: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: { type: 'null' },
            error: { type: 'boolean' }
          }
        }
      }
    }
  }, MarcaController.destroy);
}

module.exports = marcaRoutes;
