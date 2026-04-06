import { error, success } from "../../utils/response.js";
import { formatForMap } from "../../utils/geo.js";
import * as issueService from "./issue.service.js";

const isValidCoordinate = (lng, lat) => {
  return Number.isFinite(lng) && Number.isFinite(lat);
};

export const create = async (req, res) => {
  try {
    const issue = await issueService.createIssue(req.body, req.user.id);
    return success(res, issue, "Issue reported", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getAll = async (req, res) => {
  try {
    const issues = await issueService.getIssues();
    return success(res, issues, "Issues fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getNearby = async (req, res) => {
  try {
    const lng = Number(req.query.lng);
    const lat = Number(req.query.lat);

    if (!isValidCoordinate(lng, lat)) {
      return error(res, "Invalid lng or lat query params", 400);
    }

    const issues = await issueService.getNearbyIssues(lng, lat);
    return success(res, issues, "Nearby issues fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getFiltered = async (req, res) => {
  try {
    const issues = await issueService.getFilteredIssues(req.query);
    return success(res, issues, "Filtered issues fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getMapData = async (req, res) => {
  try {
    const issues = await issueService.getFilteredIssues(req.query);
    const data = formatForMap(issues);
    return success(res, data, "Map issues fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};
