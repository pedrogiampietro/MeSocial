const router = require('express').Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const user = await new User({
    username: 'Pedro',
    email: 'pedro@dev.com',
    password: '123456',
  });

  await user.save();

  return res.send('OK');
});

module.exports = router;
