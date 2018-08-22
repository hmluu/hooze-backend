
exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE phone_numbers_id_seq RESTART with 3')
    .then(() => {
      return knex('phone_numbers').del()
        .then(() => {
      return knex('phone_numbers').insert([
        {
          id: 1,
          name: 'Hoa',
          numbers: '19738858041'
        },
        {
          id: 2,
          name: 'Matt',
          numbers: '16097310971'
        }
      ]);
    });
  });
};