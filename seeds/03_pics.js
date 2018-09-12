exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE pics_id_seq RESTART with 4')
    .then(() => {
      return knex('pics').del()
        .then(() => {
      return knex('pics').insert([
       
      ]);
    });
  });
};