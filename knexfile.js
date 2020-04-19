// Update with your config settings.
const { postgresql } = require('./.env');
module.exports = {
  client: 'postgresql',
  connection: postgresql,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
