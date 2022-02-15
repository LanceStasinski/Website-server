"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const rootDir = path_1.default.dirname(require.main.filename);
const router = express_1.default.Router();
router.use(express_1.default.static(path_1.default.join(rootDir, "public", "landing", "public")));
router.get("/", (req, res, next) => {
    res.sendFile(path_1.default.resolve(rootDir, "./public/landing", "index.html"));
});
exports.default = router;
