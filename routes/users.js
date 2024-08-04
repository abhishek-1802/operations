const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('index', { users });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Add user form
router.get('/add', (req, res) => {
  res.render('add');
});

// Add user
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Edit user form
router.get('/edit/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update user
router.post('/edit/:id', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, { name, email, age });
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete user
router.post('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
