import Project from "./project.model.js";

export const createProject = async (data, userId) => {
  return Project.create({
    ...data,
    createdBy: userId,
    contributors: [userId]
  });
};

export const joinProject = async (projectId, userId) => {
  return Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { contributors: userId } },
    { returnDocument: "after" }
  )
    .populate("createdBy", "name")
    .populate("contributors", "name")
    .populate("relatedIssue", "title severity status");
};

export const getProjects = async () => {
  return Project.find()
    .sort({ createdAt: -1 })
    .populate("createdBy", "name")
    .populate("contributors", "name")
    .populate("relatedIssue", "title severity status");
};

export const updateProgress = async (projectId, progress, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.createdBy.toString() !== userId) {
    throw new Error("Not authorized");
  }

  project.progress = progress;
  if (progress >= 100) {
    project.status = "COMPLETED";
  }

  await project.save();

  return Project.findById(project._id)
    .populate("createdBy", "name")
    .populate("contributors", "name")
    .populate("relatedIssue", "title severity status");
};
