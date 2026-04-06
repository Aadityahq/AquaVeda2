import mongoose from "mongoose";

const wikiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    tags: [String],
    region: {
      type: String,
      default: "global"
    },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED"],
      default: "PENDING"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  { timestamps: true }
);

const Wiki = mongoose.model("Wiki", wikiSchema);

export default Wiki;
