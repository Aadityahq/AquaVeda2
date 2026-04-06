import { Router } from "express";
import { recommend } from "./ai.controller.js";

const router = Router();

router.get("/recommend/:id", recommend);

export default router;
