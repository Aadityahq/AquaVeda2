import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { create, list } from "./comment.controller.js";

const router = Router();

router.get("/", list);
router.post("/", verifyJWT, create);

export default router;
