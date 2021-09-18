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
    res.status(500).json(err);
  }
});

router.post('/signin', async (req, res) => {
  const { body } = req;
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    !user && res.status(404).send('user not found.');

    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json('wong password, try again.');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
