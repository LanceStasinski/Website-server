"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const check_auth_1 = require("../middleware/check-auth");
const weatherJournal_controller_1 = require("../controllers/weatherJournal-controller");
const router = express_1.default.Router();
router.post("/auth", [(0, express_validator_1.check)("username").not().isEmpty(), (0, express_validator_1.check)("password").isLength({ min: 5 })], weatherJournal_controller_1.login);
router.use(check_auth_1.auth);
router.get("/entries", weatherJournal_controller_1.getEntries);
router.delete("/entries", (0, express_validator_1.check)("id").not().isEmpty(), weatherJournal_controller_1.deleteEntry);
router.patch("/entries/:entryId", [
    (0, express_validator_1.check)("zip").not().isEmpty(),
    (0, express_validator_1.check)("subject").not().isEmpty(),
    (0, express_validator_1.check)("message").not().isEmpty(),
], weatherJournal_controller_1.updateEntry);
router.post("/preferences", [(0, express_validator_1.check)("unitPreference").not().isEmpty(), (0, express_validator_1.check)("zipCode").not().isEmpty()], weatherJournal_controller_1.updatePreferences);
router.post("/new-entry", [
    (0, express_validator_1.check)("zip").not().isEmpty(),
    (0, express_validator_1.check)("subject").not().isEmpty(),
    (0, express_validator_1.check)("message").not().isEmpty(),
], weatherJournal_controller_1.postEntry);
exports.default = router;
