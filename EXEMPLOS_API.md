# Exemplos de Requisições para a API

## Testando a API

Para testar a API, você pode usar ferramentas como Postman, Insomnia ou curl.

### 1. Health Check
```
GET http://localhost:3000/
```

### 2. Listar Rotas Disponíveis
```
GET http://localhost:3000/routes
```

### 3. Marcas

#### Listar todas as marcas
```
GET http://localhost:3000/marcas
```

#### Buscar marca por ID
```
GET http://localhost:3000/marcas/1
```

#### Remover marca
```
DELETE http://localhost:3000/marcas/5
```

### 4. Produtos

#### Listar todos os produtos
```
GET http://localhost:3000/produtos
```

#### Buscar produto por ID
```
GET http://localhost:3000/produtos/1
```

#### Cadastrar novo produto
```
POST http://localhost:3000/produtos
Content-Type: application/json

{
  "nome": "iPhone 16 Pro",
  "preco": 7999.99,
  "id_marca": 1,
  "descricao": "Novo iPhone 16 Pro com chip A18",
  "estoque": 25
}
```

### 5. Clientes

#### Listar todos os clientes
```
GET http://localhost:3000/clientes
```

#### Buscar cliente por ID
```
GET http://localhost:3000/clientes/1
```

#### Cadastrar novo cliente
```
POST http://localhost:3000/clientes
Content-Type: application/json

{
  "nome": "José Santos Silva",
  "email": "jose.santos@email.com",
  "cidade": "Campinas",
  "telefone": "(19) 99999-8888",
  "endereco": "Rua das Américas 123, Centro"
}
```

### 6. Pedidos

#### Listar todos os pedidos
```
GET http://localhost:3000/pedidos
```

#### Buscar pedido por ID
```
GET http://localhost:3000/pedidos/1
```

#### Buscar pedidos por cidade
```
GET http://localhost:3000/pedidos/cidade/São Paulo
```

#### Criar novo pedido com múltiplos itens
```
POST http://localhost:3000/pedidos
Content-Type: application/json

{
  "id_cliente": 1,
  "observacoes": "Pedido para presente de aniversário",
  "itens": [
    {
      "id_produto": 1,
      "quantidade": 1
    },
    {
      "id_produto": 3,
      "quantidade": 2
    },
    {
      "id_produto": 7,
      "quantidade": 1
    }
  ]
}
```

## Respostas da API

Todas as respostas seguem o formato:

### Sucesso
```json
{
  "message": "Operação realizada com sucesso",
  "data": { ... } ou [ ... ],
  "error": false
}
```

### Erro
```json
{
  "message": "Descrição do erro",
  "data": null,
  "error": true
}
```

## Status HTTP

- `200` - OK (Sucesso)
- `201` - Created (Criado com sucesso)
- `400` - Bad Request (Dados inválidos)
- `404` - Not Found (Não encontrado)
- `500` - Internal Server Error (Erro interno)

## Notas Importantes

1. **Estoque**: Ao criar um pedido, o estoque dos produtos é automaticamente decrementado
2. **Transações**: Criação de pedidos usa transações - se algum item falhar, todo o pedido é cancelado
3. **Relacionamentos**: Não é possível excluir marcas que possuem produtos vinculados
4. **Email Único**: Cada cliente deve ter um email único no sistema
5. **Cálculos Automáticos**: O total do pedido e subtotais dos itens são calculados automaticamente
