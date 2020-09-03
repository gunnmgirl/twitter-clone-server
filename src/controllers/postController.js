import Post from "../models/postModel";
import User from "../models/userModel";

async function createPost(req, res, next) {
  try {
    const post = await Post.create({
      content: content,
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

export { createPost };
