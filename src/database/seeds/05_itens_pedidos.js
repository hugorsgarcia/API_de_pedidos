const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('itens_pedidos').del();
  
  // Read CSV file
  const csvData = fs.readFileSync(path.join(__dirname, '../../../data/itens_pedido.csv'), 'utf8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  const itens = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const item = {};
      headers.forEach((header, index) => {
        let value = values[index] ? values[index].trim() : null;
        
        // Convert numeric fields
        if (header === 'id' || header === 'id_pedido' || header === 'id_produto' || header === 'quantidade') {
          value = value ? parseInt(value) : null;
        } else if (header === 'preco_unitario' || header === 'subtotal') {
          value = value ? parseFloat(value) : null;
        }
        
        item[header.trim()] = value;
      });
      itens.push(item);
    }
  }
  
  // Inserts seed entries
  await knex('itens_pedidos').insert(itens);
};
