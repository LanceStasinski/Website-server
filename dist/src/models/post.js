"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const postsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    blurb: { type: String, required: true },
    tags: { type: String, required: true },
    headImg: { type: String, required: true },
    headImgCaption: { type: String, required: true },
    headImgAlt: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
    content: [
        {
            type: { type: String, required: true },
            text: { type: String, required: false },
            alt: { type: String, required: false },
            caption: { type: String, required: false },
            language: { type: String, required: false },
            image: {
                key: { type: String, required: false },
                bucket: { type: String, required: false },
            },
        },
    ],
    references: [
        {
            authors: { type: String, required: false },
            date: { type: String, required: false },
            title: { type: String, required: false },
            url: { type: String, required: false },
        },
    ],
    updatedDay: { type: String, required: false },
    updatedMonth: { type: String, required: false },
    updatedYear: { type: String, required: false },
    comments: [
        { type: mongoose_1.default.Types.ObjectId, required: false, ref: "Comment" },
    ],
    admin: { type: mongoose_1.default.Types.ObjectId, ref: "Admin", required: true },
});
exports.postModel = (0, mongoose_1.model)("Post", postsSchema);
