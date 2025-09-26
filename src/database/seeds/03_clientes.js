const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clientes').del();
  
  // Read CSV file
  const csvData = fs.readFileSync(path.join(__dirname, '../../data/clientes.csv'), 'utf8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  const clientes = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const cliente = {};
      headers.forEach((header, index) => {
        let value = values[index] ? values[index].trim() : null;
        
        // Convert numeric fields
        if (header === 'id') {
          value = value ? parseInt(value) : null;
        }
        
        cliente[header.trim()] = value;
      });
      clientes.push(cliente);
    }
  }
  
  // Inserts seed entries
  await knex('clientes').insert(clientes);
};
