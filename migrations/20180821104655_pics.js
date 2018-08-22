
exports.up = function(knex) {
  return knex.schema.createTable('pics', (table) => {
    table.increments();
    table.text('image');
    table.integer('friend_id').notNullable().unsigned().references('id').inTable('friends').onDelete('cascade');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pics');
};