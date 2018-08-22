
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/doorbell'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
