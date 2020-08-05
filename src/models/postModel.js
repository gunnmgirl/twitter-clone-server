import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  /*creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },*/
  content: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
  },
  downvotes: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
