import Issue from "./issue.model.js";

export const createIssue = async (data, userId) => {
  return Issue.create({
    ...data,
    reportedBy: userId
  });
};

export const getIssues = async () => {
  return Issue.find().sort({ createdAt: -1 }).populate("reportedBy", "name");
};

export const getNearbyIssues = async (lng, lat) => {
  return Issue.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 5000
      }
    }
  }).populate("reportedBy", "name");
};

export const getFilteredIssues = async (filters) => {
  const query = {};

  if (filters.severity) {
    query.severity = filters.severity;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.region) {
    query.region = filters.region;
  }

  return Issue.find(query).sort({ createdAt: -1 }).populate("reportedBy", "name");
};
