const BlogPost = require('../models/BlogPost');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};