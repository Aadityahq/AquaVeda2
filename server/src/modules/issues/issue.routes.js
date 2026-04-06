import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { create, getAll, getFiltered, getMapData, getNearby } from "./issue.controller.js";

const router = Router();

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.get("/filter", getFiltered);
router.get("/map", getMapData);
router.get("/nearby", getNearby);

export default router;
