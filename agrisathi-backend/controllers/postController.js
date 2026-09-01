const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Get all community posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const { tag, search } = req.query;
  const filter = {};

  if (tag) filter.tags = tag;
  if (search) filter.title = { $regex: search, $options: "i" };

  const posts = await Post.find(filter)
    .populate("user", "name profileImage location")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: posts.length, data: posts });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "name profileImage location")
    .populate("comments.user", "name profileImage");

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.json({ success: true, data: post });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content, images, tags } = req.body;
  const post = await Post.create({
    user: req.user._id,
    title,
    content,
    images,
    tags,
  });
  res.status(201).json({ success: true, data: post });
});

// @desc    Add comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const comment = { user: req.user._id, text: req.body.text };
  post.comments.push(comment);
  await post.save();

  res.status(201).json({ success: true, data: post });
});

// @desc    Toggle like on a post
// @route   PUT /api/posts/:id/like
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const alreadyLiked = post.likes.includes(req.user._id);
  if (alreadyLiked) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
  } else {
    post.likes.push(req.user._id);
  }

  await post.save();
  res.json({ success: true, data: post });
});

// @desc    Delete post (only owner)
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this post");
  }
  await post.deleteOne();
  res.json({ success: true, message: "Post deleted" });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  addComment,
  toggleLike,
  deletePost,
};
