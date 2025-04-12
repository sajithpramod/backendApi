// tests/setupTestDB.js
const pgmigrate = require('node-pg-migrate');

module.exports = async () => {
  const migrationConfig = {
    databaseUrl: process.env.TEST_DATABASE_URL,
    dir: 'migrations',
    migrationsTable: 'pgmigrations',
    noLock: true,
  };

  // Rollback all migrations
  await pgmigrate.default({
    ...migrationConfig,
    direction: 'down',
    count: Infinity,
  });

  // Apply all migrations
  await pgmigrate.default({
    ...migrationConfig,
    direction: 'up',
    createSchema: true,
    verbose: false,
  });
};
