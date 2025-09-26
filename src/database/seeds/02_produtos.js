const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produtos').del();
  
  // Read CSV file
  const csvData = fs.readFileSync(path.join(__dirname, '../../data/produtos.csv'), 'utf8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  const produtos = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const produto = {};
      headers.forEach((header, index) => {
        let value = values[index] ? values[index].trim() : null;
        
        // Convert numeric fields
        if (header === 'id' || header === 'id_marca' || header === 'estoque') {
          value = value ? parseInt(value) : null;
        } else if (header === 'preco') {
          value = value ? parseFloat(value) : null;
        }
        
        produto[header.trim()] = value;
      });
      produtos.push(produto);
    }
  }
  
  // Inserts seed entries
  await knex('produtos').insert(produtos);
};
