const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('marcas').del();
  
  // Read CSV file
  const csvData = fs.readFileSync(path.join(__dirname, '../../data/marcas.csv'), 'utf8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  const marcas = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',');
      const marca = {};
      headers.forEach((header, index) => {
        marca[header.trim()] = values[index] ? values[index].trim() : null;
      });
      marcas.push(marca);
    }
  }
  
  // Inserts seed entries
  await knex('marcas').insert(marcas);
};
