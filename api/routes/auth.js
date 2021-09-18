const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { body } = req;
  const { username, email, password } = body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
