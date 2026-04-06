import Issue from "../issues/issue.model.js";
import { rules } from "./ai.rules.js";

export const getRecommendations = async (issueId) => {
  const issue = await Issue.findById(issueId);

  if (!issue) {
    throw new Error("Issue not found");
  }

  for (const rule of rules) {
    if (rule.condition(issue)) {
      return rule.result;
    }
  }

  return ["No specific recommendation available"];
};
