
exports.up = function(knex) {
  return knex.schema.createTable('friends', (table) => {
    table.increments();
    table.text('image').notNullable();
    table.text('name').notNullable();
    table.text('relation').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('friends');
};
