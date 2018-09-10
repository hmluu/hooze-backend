exports.up = function(knex) {
  return knex.schema.table('pics', (table) => {
    table.text('face_ids');
  })
};

exports.down = function(knex) {
  return knex.schema.table('pics', (table) => {
    table.dropColumn('face_ids');
  })
};