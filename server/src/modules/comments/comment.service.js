import Comment from "./comment.model.js";

export const addComment = async (payload, userId) => {
  return Comment.create({
    ...payload,
    user: userId
  });
};

export const getComments = async (refType, refId) => {
  return Comment.find({ refType, refId })
    .populate("user", "name")
    .sort({ createdAt: -1 });
};
