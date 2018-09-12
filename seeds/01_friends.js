
exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE friends_id_seq RESTART with 4')
    .then(() => {
      return knex('friends').del()
        .then(() => {
      return knex('friends').insert([
        
      ]);
    });
  });
};
