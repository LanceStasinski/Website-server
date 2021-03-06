import path from "path";

import express, { Request, Response, NextFunction } from "express";

const rootDir = path.dirname(require.main!.filename);

const router = express.Router();

router.use(express.static(path.join(rootDir, "public", "landing", "public")));

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve(rootDir, "./public/landing", "index.html"));
});

export default router;
