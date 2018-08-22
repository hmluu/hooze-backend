const knex = require('./knex');

module.exports = {
  getAll() {
    return knex('friends');
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
  }
}
