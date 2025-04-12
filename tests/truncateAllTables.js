// tests/truncateAllTables.js
const knex = require('../src/db');

const truncateAllTables = async () => {
  const tables = await knex.raw(`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'knex_%';
  `);

  for (const row of tables.rows) {
    await knex.raw(`TRUNCATE TABLE "${row.tablename}" RESTART IDENTITY CASCADE`);
  }
};
module.exports = truncateAllTables;
