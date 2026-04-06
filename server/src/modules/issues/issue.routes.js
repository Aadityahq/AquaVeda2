import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { create, getAll, getNearby } from "./issue.controller.js";

const router = Router();

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.get("/nearby", getNearby);

export default router;
