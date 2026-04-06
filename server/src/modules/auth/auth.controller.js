import { loginUser, registerUser } from "./auth.service.js";
import { error, success } from "../../utils/response.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return success(res, user, "User registered", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return success(res, result, "Login successful");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const me = async (req, res) => {
  try {
    return success(res, req.user, "Current user");
  } catch (err) {
    return error(res, "Server error", 500);
  }
};
