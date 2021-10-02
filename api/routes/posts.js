const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//create a post
router.post('/', async (req, res) => {
  const { body } = req;
  const newPost = new Post(body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put('/:id', async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const { userId } = body;

    const post = await Post.findById(id);

    if (post.userId === userId) {
      await post.updateOne({ $set: body });
      res.status(200).json('the post has been updated.');
    } else {
      res.status(403).json('you can update only your post.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const { userId } = body;

    const post = await Post.findById(id);

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json('the post has been deleted.');
    } else {
      res.status(403).json('you can delete only your post.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like and a deslike a post
router.put('/:id/like', async (req, res) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const { userId } = body;

    const post = await Post.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('the post has been liked.');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('the post has been desliked.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get('/:id', async (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts timeline.
router.get('/timeline/:userId', async (req, res) => {
  try {
    const { params } = req;
    const { userId } = params;

    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts
router.get('/profile/:username', async (req, res) => {
  try {
    const { params } = req;
    const { username } = params;

    const user = await User.findOne({ username: username });
    const posts = await Post.find({ uesrId: user._id });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
