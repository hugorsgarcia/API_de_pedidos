const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pedidos').del();
  
  // Read CSV file
  const csvData = fs.readFileSync(path.join(__dirname, '../../data/pedidos.csv'), 'utf8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  const pedidos = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const pedido = {};
      headers.forEach((header, index) => {
        let value = values[index] ? values[index].trim() : null;
        
        // Convert numeric and date fields
        if (header === 'id' || header === 'id_cliente') {
          value = value ? parseInt(value) : null;
        } else if (header === 'total') {
          value = value ? parseFloat(value) : null;
        } else if (header === 'data') {
          value = value ? new Date(value) : null;
        }
        
        pedido[header.trim()] = value;
      });
      pedidos.push(pedido);
    }
  }
  
  // Inserts seed entries
  await knex('pedidos').insert(pedidos);
};
