exports.up = (pgm) => {
    // Enable the uuid-ossp extension if not already enabled
    pgm.sql(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  
    pgm.createTable('users', {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },
      email: { type: 'varchar(100)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true },
      role: { type: 'varchar(50)', notNull: true, default: 'user' },
      created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('users');
  };
  