
exports.up = function(knex) {
  return knex.schema.createTable('phone_numbers', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('numbers').notNullable();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('phone_numbers');
};