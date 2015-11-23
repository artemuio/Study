// Update with your config settings.
var config = require('./config');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: config.get("db_host"),
      port: config.get("db_port"),
      user: config.get("db_user"),
      password: config.get("db_password"),
      database: config.get("db_name")
    },
    seeds: {directory: './seeds'},
    debug: true
  },

  staging: {
    client: 'mysql',
    connection: {
      host: config.get("db_host"),
      port: config.get("db_port"),
      user: config.get("db_user"),
      password: config.get("db_password"),
      database: config.get("db_name")
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: config.get("db_host"),
      port: config.get("db_port"),
      user: config.get("db_user"),
      password: config.get("db_password"),
      database: config.get("db_name")
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    debug: false
  }

};
