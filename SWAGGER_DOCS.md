# 📚 Documentação Completa da API - Sistema de Pedidos

A API agora possui **documentação interativa completa com Swagger**! 

## 🎯 **Acesso à Documentação**

### **Swagger UI (Documentação Interativa)**
🔗 **http://localhost:3001/docs**

- Interface visual completa
- Testar todas as rotas diretamente no navegador
- Exemplos de requisições e respostas
- Esquemas de dados detalhados
- Validação de parâmetros

### **Lista de Rotas (JSON)**
🔗 **http://localhost:3001/routes**

- Lista simples de todas as rotas disponíveis
- Formato JSON para integração

### **Health Check**
🔗 **http://localhost:3001/**

- Verificar se a API está funcionando
- Informações de versão e timestamp

## 🧪 **Testando a API**

### **Via Swagger UI (Recomendado)**
1. Acesse: http://localhost:3001/docs
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os parâmetros necessários
5. Clique em "Execute"
6. Veja a resposta em tempo real

### **Via Postman/Insomnia**
Use os exemplos abaixo ou importe a coleção do Swagger.

## 📋 **Exemplos de Teste**

### **1. Listar Marcas**
```http
GET http://localhost:3001/marcas
```

### **2. Buscar Marca por ID**
```http
GET http://localhost:3001/marcas/1
```

### **3. Cadastrar Produto**
```http
POST http://localhost:3001/produtos
Content-Type: application/json

{
  "nome": "iPhone 16 Pro Max",
  "preco": 8999.99,
  "id_marca": 1,
  "descricao": "Novo iPhone 16 Pro Max com chip A18 Pro",
  "estoque": 15
}
```

### **4. Cadastrar Cliente**
```http
POST http://localhost:3001/clientes
Content-Type: application/json

{
  "nome": "Maria da Silva Santos",
  "email": "maria.silva@email.com",
  "cidade": "São Paulo",
  "telefone": "(11) 99876-5432",
  "endereco": "Rua das Palmeiras, 456 - Vila Madalena"
}
```

### **5. Criar Pedido Completo**
```http
POST http://localhost:3001/pedidos
Content-Type: application/json

{
  "id_cliente": 1,
  "observacoes": "Entrega expressa solicitada",
  "itens": [
    {
      "id_produto": 1,
      "quantidade": 1
    },
    {
      "id_produto": 3,
      "quantidade": 2
    }
  ]
}
```

### **6. Buscar Pedidos por Cidade**
```http
GET http://localhost:3001/pedidos/cidade/São Paulo
```

## 🔧 **Funcionalidades do Swagger**

### **Tags Organizadas**
- **Sistema**: Health check e informações gerais
- **Marcas**: Operações com marcas
- **Produtos**: Operações com produtos  
- **Clientes**: Operações com clientes
- **Pedidos**: Operações com pedidos

### **Validações Automáticas**
- Tipos de dados corretos
- Campos obrigatórios
- Formatos de email
- Valores mínimos/máximos
- Enums para status

### **Responses Documentadas**
- Códigos de status HTTP
- Estrutura de resposta padrão
- Mensagens de erro detalhadas
- Exemplos de payloads

## 🎨 **Interface Swagger**

A documentação Swagger inclui:

✅ **Visão Geral**: Informações da API e contato  
✅ **Modelos de Dados**: Estruturas de todas as entidades  
✅ **Endpoints Agrupados**: Por funcionalidade  
✅ **Try It Out**: Teste direto na interface  
✅ **Curl Commands**: Comandos curl gerados automaticamente  
✅ **Response Samples**: Exemplos de respostas  
✅ **Schema Validation**: Validação de dados em tempo real  

## 🚀 **Próximos Passos**

1. **Explore a documentação** em http://localhost:3001/docs
2. **Teste as rotas** diretamente no Swagger UI
3. **Verifique as validações** enviando dados incorretos
4. **Analise as respostas** para entender a estrutura
5. **Use nos seus projetos** como referência da API

---

**🎯 A documentação Swagger torna a API auto-explicativa e facilita a integração!**