const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('friends');
  },
  getAllEvents() {
    return knex('events');
  },
  getAllImages(id) {
    return knex('pics').where('friend_id',id)
  },
  getOne(id) {
    return knex('friends').where('id', id).first();
  },
  create(friend) {
    return knex('friends').insert(friend, '*');
  },
  update(id, friend) {
    return knex('friends').where('id', id).update(friend, '*');
  },
  delete(id) {
    return knex('friends').where('id', id).del();
  },
  insertPic(friend_id, image, face_ids) {
    return knex('pics').insert({
      friend_id,
      image,
      face_ids
    }, '*');
  },
  insertEvent(image, isFriends, timestamp) {
    return knex('events').insert({
      image,
      isFriends,
      timestamp
    }, '*')
  }
}
