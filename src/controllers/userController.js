// src/controllers/userController.js
const knex = require('../db'); // Ensure this exports the configured knex instance

exports.getUsers = async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const [user] = await knex('users')
      .insert({ name, email })
      .returning('*'); // returns the full inserted row

    res.status(201).json(user);
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};
