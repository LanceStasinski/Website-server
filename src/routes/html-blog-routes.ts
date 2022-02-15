import path from "path";

import express, { Request, Response, NextFunction } from "express";

const rootDir = path.dirname(require.main!.filename);

const router = express.Router();

router.use(express.static(path.join(rootDir, "public", "html-blog", "public")));

router.get("/home", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(rootDir, "./public/html-blog/public/views", "index.html")
  );
});

router.get("/about", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(rootDir, "./public/html-blog/public/views", "about.html")
  );
});

router.get(
  "/april-1-2021",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(
      path.resolve(
        rootDir,
        "./public/html-blog/public/views",
        "april-1-2021.html"
      )
    );
  }
);

router.get("/contact", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(rootDir, "./public/html-blog/public/views", "contact.html")
  );
});

router.get(
  "/march-30-2021",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(
      path.resolve(
        rootDir,
        "./public/html-blog/public/views",
        "march-30-2021.html"
      )
    );
  }
);

router.get(
  "/march-31-2021",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(
      path.resolve(
        rootDir,
        "./public/html-blog/public/views",
        "march-31-2021.html"
      )
    );
  }
);

router.get("/subscribe", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(rootDir, "./public/html-blog/public/views", "subscribe.html")
  );
});

router.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(
    path.resolve(rootDir, "./public/html-blog/public/views", "index.html")
  );
});

export default router;
