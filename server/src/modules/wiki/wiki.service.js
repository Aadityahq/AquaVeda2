import Wiki from "./wiki.model.js";

export const createArticle = async (data, userId) => {
  return Wiki.create({
    ...data,
    author: userId
  });
};

export const getAllApproved = async () => {
  return Wiki.find({ status: "APPROVED" }).populate("author", "name");
};

export const approveArticle = async (id, expertId) => {
  return Wiki.findByIdAndUpdate(
    id,
    {
      status: "APPROVED",
      verifiedBy: expertId
    },
    { new: true }
  );
};
