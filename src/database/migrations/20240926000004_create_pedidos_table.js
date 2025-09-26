/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', function(table) {
    table.increments('id').primary();
    table.integer('id_cliente').unsigned().notNullable();
    table.datetime('data').notNullable();
    table.decimal('total', 10, 2).defaultTo(0);
    table.enum('status', ['pendente', 'processando', 'enviado', 'entregue', 'cancelado']).defaultTo('pendente');
    table.text('observacoes');
    table.timestamps(true, true);
    
    table.foreign('id_cliente').references('id').inTable('clientes').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
