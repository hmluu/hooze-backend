
exports.seed = function(knex) {
  return knex.raw('ALTER SEQUENCE events_id_seq RESTART with 4')
    .then(() => {
      return knex('events').del()
        .then(() => {
      return knex('events').insert([
        {
          id: 1,
          image:'https://s3.amazonaws.com/hooze-images/friends/cj.jpg', 
          isFriends: true,
          timestamp: '2018-04-23 18:13:40'

        },

        {
          id: 2,
          image:'https://s3.amazonaws.com/hooze-images/friends/nick.jpg', 
          isFriends: true,
          timestamp: '2018-08-15 13:05:40'
        },

        {
          id: 3,
          image:'https://s3.amazonaws.com/hooze-images/friends/snow.jpg', 
          isFriends: true,
          timestamp: '2018-08-25 17:30:40'
        }
      ]);
    });
  });
};

