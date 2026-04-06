import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { create, getAll, join, setProgress } from "./project.controller.js";

const router = Router();

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.post("/:id/join", verifyJWT, join);
router.patch("/:id/progress", verifyJWT, setProgress);

export default router;
