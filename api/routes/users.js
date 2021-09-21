const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//update user;
router.put('/:id', async (req, res) => {
  const { body, params } = req;
  const { userId, password, isAdmin } = body;
  const { id } = params;

  if (userId === id || isAdmin) {
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: body,
      });

      res.status(200).json('Account has been updated.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account.');
  }
});

//delete user;
router.delete('/:id', async (req, res) => {
  const { body, params } = req;
  const { userId, isAdmin } = body;
  const { id } = params;

  if (userId === id || isAdmin) {
    try {
      const user = await User.deleteOne({ _id: id });

      res.status(200).json('Account has been deleted.');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account.');
  }
});

//get a user;
router.get('/:id', async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    const user = await User.findById(id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user;
router.put('/:id/follow', async (req, res) => {
  const { body, params } = req;
  const { userId } = body;
  const { id } = params;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({
          $push: { followers: userId },
        });

        await currentUser.updateOne({
          $push: {
            followings: id,
          },
        });
        res.status(200).json('user has been followed.');
      } else {
        res.status(403).json('you allready follow this user.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself.');
  }
});

//unfollow a user;
router.put('/:id/unfollow', async (req, res) => {
  const { body, params } = req;
  const { userId } = body;
  const { id } = params;

  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({
          $pull: { followers: userId },
        });

        await currentUser.updateOne({
          $pull: {
            followings: id,
          },
        });
        res.status(200).json('user has been unfollowed.');
      } else {
        res.status(403).json('you dont follow this user.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself.');
  }
});

module.exports = router;
