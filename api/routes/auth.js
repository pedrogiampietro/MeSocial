const router = require('express').Router();

router.get('/', (req, res) => {
  return res.send('Auth Router.');
});

module.exports = router;
