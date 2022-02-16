"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moreInfo_controller_1 = require("../controllers/moreInfo-controller");
const router = express_1.default.Router();
router.get("/", moreInfo_controller_1.getVideo);
exports.default = router;
