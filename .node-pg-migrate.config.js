module.exports = {
    migrationDirectory: 'migrations',
    direction: 'up',
    logFileName: 'migrations.log',
    environments: {
      test: {
        databaseUrl: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 5432,
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'myapp_test_db',
        }
      }
    }
  };
  