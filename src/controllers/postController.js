import Post from "../models/postModel";
import User from "../models/userModel";

async function createPost(req, res, next) {
  try {
    const post = await Post.create({
      content: req.body.content,
      upvotes: 0,
      downvotes: 0,
      creator: req.userId,
    });
    const user = await User.findById(req.userId);
    user.posts.push(post);
    await user.save();
    res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function editPost(req, res, next) {
  const { postId, newContent } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { content: newContent },
      { new: true }
    );
    return res.status(200).send(updatedPost);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function deletePost(req, res, next) {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post.creator.toString() !== req.userId) {
      const error = new Error("Not authorized!");
      error.statusCode = 401;
      throw error;
    }
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
    res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function getPosts(req, res, next) {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export default { createPost, getPosts, deletePost, editPost };
