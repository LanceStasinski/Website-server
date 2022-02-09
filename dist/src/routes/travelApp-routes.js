"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelApp_controller_1 = require("../controllers/travelApp-controller");
const router = express_1.default.Router();
router.post("/add", travelApp_controller_1.postTripData);
router.post("/update", travelApp_controller_1.updateTripData);
exports.default = router;
