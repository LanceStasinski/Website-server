"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const rootDir = path_1.default.dirname(require.main.filename);
const router = express_1.default.Router();
router.use(express_1.default.static(path_1.default.join(rootDir, "public", "html-blog", "public")));
router.get("/home", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "index.html"));
});
router.get("/about", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "about.html"));
});
router.get("/april-1-2021", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "april-1-2021.html"));
});
router.get("/contact", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "contact.html"));
});
router.get("/march-30-2021", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "march-30-2021.html"));
});
router.get("/march-31-2021", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "march-31-2021.html"));
});
router.get("/subscribe", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "subscribe.html"));
});
router.use((req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/html-blog/public/views", "index.html"));
});
exports.default = router;
