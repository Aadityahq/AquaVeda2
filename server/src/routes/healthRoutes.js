import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Aquaveda health check OK" });
});

export default router;