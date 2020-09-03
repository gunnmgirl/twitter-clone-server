import Post from "../models/postModel";

async function createPost(req, res, next) {
  try {
    const post = await Post.create({
      content: content,
      upvotes: 0,
      downvotes: 0,
      creator: req.userId,
    });
    res.status(200).send(post);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export { createPost };
