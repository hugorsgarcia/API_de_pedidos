# Sistema de Gerenciamento de Pedidos

**Desenvolvido por:** Hugo Garcia

Sistema completo para gerenciamento de pedidos desenvolvido em Node.js, utilizando MySQL como banco de dados, Knex.js para migrations e queries, e Fastify como framework web.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **MySQL** - Sistema de gerenciamento de banco de dados
- **Knex.js** - Query builder e gerenciador de migrations
- **Fastify** - Framework web rápido e eficiente
- **Nodemon** - Desenvolvimento com hot reload

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MySQL Server (versão 8.0 ou superior)
- Git

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd sistema-pedidos
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar o banco de dados
- Certifique-se de que o MySQL Server esteja rodando
- Crie um banco de dados chamado `sistema_pedidos`:
```sql
CREATE DATABASE sistema_pedidos;
```
- Ajuste as configurações de conexão no arquivo `knexfile.js` se necessário:
  - Host: localhost
  - Usuário: root
  - Senha: (deixe vazio ou configure conforme seu ambiente)
  - Banco: sistema_pedidos

### 4. Executar migrations
```bash
npx knex migrate:latest
```
ou
```bash
npm run migrate
```

### 5. Popular o banco com dados iniciais (seeds)
```bash
npx knex seed:run
```
ou
```bash
npm run seed
```

### 6. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

### 7. Acessar a documentação interativa (Swagger)
```
http://localhost:3000/docs
```

A API possui documentação completa e interativa com Swagger UI, onde você pode:
- Visualizar todos os endpoints
- Testar as rotas diretamente no navegador
- Ver exemplos de requisições e respostas
- Validar dados em tempo real

## 📊 Estrutura do Banco de Dados

O sistema possui 5 tabelas principais:

### Marcas
- `id` (PK)
- `nome`
- `pais`
- `descricao`
- `created_at`, `updated_at`

### Produtos
- `id` (PK)
- `nome`
- `preco`
- `id_marca` (FK → marcas)
- `descricao`
- `estoque`
- `created_at`, `updated_at`

### Clientes
- `id` (PK)
- `nome`
- `email` (unique)
- `cidade`
- `telefone`
- `endereco`
- `created_at`, `updated_at`

### Pedidos
- `id` (PK)
- `id_cliente` (FK → clientes)
- `data`
- `total`
- `status`
- `observacoes`
- `created_at`, `updated_at`

### Itens Pedidos
- `id` (PK)
- `id_pedido` (FK → pedidos)
- `id_produto` (FK → produtos)
- `quantidade`
- `preco_unitario`
- `subtotal`
- `created_at`, `updated_at`

## 🌐 API Endpoints

### Marcas
- `GET /marcas` - Lista todas as marcas
- `GET /marcas/:id` - Busca marca por ID
- `DELETE /marcas/:id` - Remove marca por ID

### Produtos
- `GET /produtos` - Lista todos os produtos (com dados da marca)
- `GET /produtos/:id` - Busca produto por ID
- `POST /produtos` - Cadastra novo produto

### Clientes
- `GET /clientes` - Lista todos os clientes
- `GET /clientes/:id` - Busca cliente por ID
- `POST /clientes` - Cadastra novo cliente

### Pedidos
- `GET /pedidos` - Lista todos os pedidos (com itens)
- `GET /pedidos/:id` - Busca pedido por ID (com itens)
- `GET /pedidos/cidade/:cidade` - Lista pedidos por cidade (com itens)
- `POST /pedidos` - Cadastra novo pedido (com itens automaticamente)

### Utilitários
- `GET /` - Health check da API
- `GET /routes` - Lista todas as rotas disponíveis
- `GET /docs` - **Documentação Swagger interativa**

## 📝 Formato de Resposta

Todas as rotas retornam dados no formato JSON padronizado:

```json
{
  "message": "mensagem explicativa",
  "data": "dados retornados (objeto ou array)",
  "error": false
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento com nodemon
- `npm start` - Inicia servidor de produção
- `npm run migrate` - Executa migrations
- `npm run seed` - Executa seeds
- `npm run rollback` - Desfaz última migration

## 📁 Estrutura do Projeto

```
sistema-pedidos/
├── src/
│   ├── controllers/          # Controllers da aplicação
│   │   ├── ClienteController.js
│   │   ├── MarcaController.js
│   │   ├── PedidoController.js
│   │   └── ProdutoController.js
│   ├── database/             # Configurações do banco
│   │   ├── migrations/       # Arquivos de migration
│   │   ├── seeds/           # Arquivos de seed
│   │   └── connection.js    # Configuração de conexão
│   ├── routes/              # Definição das rotas
│   │   ├── clientes.js
│   │   ├── marcas.js
│   │   ├── pedidos.js
│   │   └── produtos.js
│   └── app.js               # Arquivo principal da aplicação
├── data/                    # Arquivos CSV para seeds
│   ├── clientes.csv
│   ├── itens_pedido.csv
│   ├── marcas.csv
│   ├── pedidos.csv
│   └── produtos.csv
├── knexfile.js              # Configurações do Knex
├── package.json
└── README.md
```

## 💡 Funcionalidades Principais

### Gerenciamento de Pedidos
- Criação automática de pedidos com múltiplos itens
- Controle automático de estoque
- Cálculo automático de subtotais e total do pedido
- Transações seguras (rollback em caso de erro)

### Relacionamentos
- Produtos vinculados às marcas
- Pedidos vinculados aos clientes
- Itens de pedidos vinculados aos produtos e pedidos
- Consultas com JOIN para dados relacionais

### Validações
- Verificação de estoque antes de criar pedidos
- Validação de email único para clientes
- Verificação de existência de registros relacionados
- Prevenção de exclusão de marcas com produtos vinculados

## 🎯 Exemplos de Uso

### Cadastrar um novo produto
```bash
POST /produtos
Content-Type: application/json

{
  "nome": "iPhone 16",
  "preco": 5999.99,
  "id_marca": 1,
  "descricao": "Novo iPhone 16",
  "estoque": 10
}
```

### Criar um pedido com múltiplos itens
```bash
POST /pedidos
Content-Type: application/json

{
  "id_cliente": 1,
  "observacoes": "Pedido urgente",
  "itens": [
    {
      "id_produto": 1,
      "quantidade": 2
    },
    {
      "id_produto": 3,
      "quantidade": 1
    }
  ]
}
```

## 📞 Contato

**Hugo Garcia**
- Email: [seu-email@exemplo.com]
- LinkedIn: [seu-linkedin]

---

💻 **Desenvolvido com ❤️ usando Node.js, MySQL e Knex.js**
