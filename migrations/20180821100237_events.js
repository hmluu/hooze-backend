
exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments();
    table.text('image').notNullable();
    table.boolean('isFriends').notNullable().default(false);
    table.dateTime('timestamp');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('events');
};