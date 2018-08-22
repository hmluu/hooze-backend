exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE phone_numbers_id_seq RESTART with 4')
    .then(() => {
      return knex('pics').del()
        .then(() => {
      return knex('pics').insert([
        {
          id: 1,
          friend_id: 2,
          image: 'https://s3.amazonaws.com/hooze-images/friends/cj.jpg'
        },
        {
          id: 2,
          friend_id: 1,
          image: 'https://s3.amazonaws.com/hooze-images/friends/snow.jpg'
        },
        {
          id: 3, 
          friend_id: 3,
          image: 'https://s3.amazonaws.com/hooze-images/friends/nick.jpg'  
        }
      ]);
    });
  });
};