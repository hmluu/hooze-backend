
exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE events_id_seq RESTART with 4')
    .then(() => {
      return knex('events').del()
        .then(() => {
      return knex('events').insert([
      ]);
    });
  });
};

