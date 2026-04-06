import { error, success } from "../../utils/response.js";
import { getRecommendations } from "./ai.service.js";

export const recommend = async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.params.id);
    return success(res, recommendations, "Recommendations fetched");
  } catch (err) {
    if (err.message === "Issue not found") {
      return error(res, err.message, 404);
    }

    return error(res, err.message, 400);
  }
};
