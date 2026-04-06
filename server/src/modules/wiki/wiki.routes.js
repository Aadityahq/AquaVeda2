import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { approve, create, getAll } from "./wiki.controller.js";

const router = Router();

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.post("/:id/approve", verifyJWT, allowRoles("EXPERT", "ADMIN"), approve);

export default router;
