import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    refType: {
      type: String,
      enum: ["ISSUE", "WIKI"],
      required: true
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null
    }
  },
  { timestamps: true }
);

commentSchema.index({ refType: 1, refId: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
