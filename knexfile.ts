// Update with your config settings.

module.exports = {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/data/dms.db'
    },
    debug: true,
    migrations: {
      directory: __dirname + '/src/migrations',
      stub: __dirname + '/migration.stub',
      tableName: 'knex_migrations'
    }
  };
