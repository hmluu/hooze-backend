
exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE friends_id_seq RESTART with 4')
    .then(() => {
      return knex('friends').del()
        .then(() => {
      return knex('friends').insert([
        {
          id: 1,
          name: 'Snow',
          relation: 'friend'
        },
        {
          id: 2,
          name: 'cj',
          relation: 'friend'
        },
        {
          id: 3,
          name: 'nick',
          relation: 'friend'
        }
      ]);
    });
  });
};
