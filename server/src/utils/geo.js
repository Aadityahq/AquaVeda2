export const formatForMap = (issues) => {
  return issues.map((issue) => ({
    id: issue._id,
    title: issue.title,
    severity: issue.severity,
    status: issue.status,
    coordinates: issue.location.coordinates,
    reportedBy: issue.reportedBy?.name || null,
    createdAt: issue.createdAt
  }));
};
