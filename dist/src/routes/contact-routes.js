"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const contact_controller_1 = require("../controllers/contact-controller");
const router = express_1.default.Router();
router.post("/", [
    (0, express_validator_1.check)("firstName").not().isEmpty(),
    (0, express_validator_1.check)("lastName").not().isEmpty(),
    (0, express_validator_1.check)("email").not().isEmpty(),
    (0, express_validator_1.check)("message").not().isEmpty(),
], contact_controller_1.sendMessage);
exports.default = router;
