require('dotenv').config();
const db = require('../src/db'); // or however you're connecting

// Example insert:
async function seed() {
  await db.query(`
    INSERT INTO users (email, password, role)
    VALUES ('admin@example.com', 'hashed_password_here', 'admin')
  `);

  console.log('Seed data inserted ✅');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error ❌', err);
  process.exit(1);
});
