"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.postComment = exports.updatePost = exports.deletePost = exports.getPost = exports.getPostHeaders = exports.createPost = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
const http_error_1 = __importDefault(require("../models/http-error"));
const comment_1 = require("../models/comment");
const user_1 = require("../models/user");
const admin_1 = require("../models/admin");
const post_1 = require("../models/post");
const socket_1 = __importDefault(require("../socket"));
const parseContent_1 = __importDefault(require("../helpers/blog/parseContent"));
const parseReferences_1 = __importDefault(require("../helpers/blog/parseReferences"));
dotenv_1.default.config();
const ADMIN_ID = process.env.ADMIN_ID;
const AMZ_ACCESS_KEY = process.env.AMZ_ACCESS_KEY;
const AMZ_SECRET_ACCESS_KEY = process.env.AMZ_SECRET_ACCESS_KEY;
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const EMAIL = process.env.EMAIL;
const CLIENT_URL = process.env.CLIENT_URL;
const AMZ_S3_BUCKET = process.env.AMZ_S3_BUCKET;
const transporter = nodemailer_1.default.createTransport((0, nodemailer_sendgrid_transport_1.default)({
    auth: {
        api_key: SENDGRID_KEY,
    },
}));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.userId !== ADMIN_ID) {
        const err = new http_error_1.default("Invalid credentials.", 401);
        next(err);
        return err;
    }
    const { title, blurb, tags, headImg, headImgCaption, headImgAlt, month, day, year, numContent, numReferences, } = req.body;
    if (title === "" ||
        blurb === "" ||
        tags === "" ||
        headImg === "" ||
        headImgCaption === "" ||
        headImgAlt === "") {
        const err = new http_error_1.default("Heading information missing.", 422);
        next(err);
        return err;
    }
    const reqKeys = Object.keys(req.body);
    const filesArr = req.files;
    const content = (0, parseContent_1.default)(numContent, reqKeys, filesArr, req.body, next);
    const references = (0, parseReferences_1.default)(numReferences, reqKeys, req.body);
    const createdPost = new post_1.postModel({
        title,
        blurb,
        tags,
        headImg,
        headImgCaption,
        headImgAlt,
        month,
        day,
        year,
        content,
        references,
        admin: req.userId,
        updatedDay: "",
        updatedMonth: "",
        updatedYear: "",
    });
    let admin;
    try {
        admin = yield admin_1.adminModel.findById(req.userId);
    }
    catch (error) {
        const err = new http_error_1.default("Database error.", 500);
        next(err);
        return err;
    }
    if (!admin) {
        const err = new http_error_1.default("Could not find admin for provided ID", 404);
        next(err);
        return err;
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield createdPost.save();
        admin.posts.push(createdPost);
        yield admin.save();
        yield sess.commitTransaction();
        sess.endSession();
    }
    catch (error) {
        const err = new http_error_1.default("Could not save post.", 500);
        next(err);
        return err;
    }
    res.status(201).json({ message: "Data recieved" });
});
exports.createPost = createPost;
const getPostHeaders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let posts;
    try {
        posts = yield post_1.postModel.find({}, {
            title: 1,
            blurb: 1,
            month: 1,
            day: 1,
            year: 1,
            tags: 1,
            headImg: 1,
            headImgAlt: 1,
        });
    }
    catch (error) {
        const err = new http_error_1.default("Could not get posts, please try again later.", 500);
        next(err);
        return err;
    }
    if (!posts) {
        const err = new http_error_1.default("Posts not found.", 404);
        next(err);
        return err;
    }
    res.status(200).json({ posts });
});
exports.getPostHeaders = getPostHeaders;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    let post;
    try {
        post = yield post_1.postModel.findOne({ title: postId }, "-admin").populate("comments");
    }
    catch (error) {
        const err = new http_error_1.default("Could not get post, please try again later.", 500);
        next(err);
        return err;
    }
    if (!post) {
        const err = new http_error_1.default("Posts not found.", 404);
        next(err);
        return err;
    }
    post.content.map((content) => {
        if (content.type === "image") {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: AMZ_ACCESS_KEY,
                secretAccessKey: AMZ_SECRET_ACCESS_KEY,
                region: "us-east-1",
            });
            const url = s3.getSignedUrl("getObject", {
                Bucket: content.image.bucket,
                Key: content.image.key,
                Expires: 60,
            });
            if (!url) {
                const err = new http_error_1.default("Cannot get image.", 500);
                next(err);
                return err;
            }
            content.text = url;
        }
    });
    let posts;
    try {
        posts = yield post_1.postModel.find({}, { title: 1, _id: 1 });
    }
    catch (error) {
        const err = new http_error_1.default("Cannot load post. Please try again.", 500);
        next(err);
        return err;
    }
    res.status(200).json({ post, posts });
});
exports.getPost = getPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = req.params.postId;
    if (req.userId !== ADMIN_ID) {
        const err = new http_error_1.default("Invalid credentials.", 401);
        next(err);
        return err;
    }
    let post;
    try {
        post = yield post_1.postModel.findById(postId).populate("admin").populate("comments");
    }
    catch (error) {
        const err = new http_error_1.default("MongoDB error getting post.", 500);
        next(err);
        return err;
    }
    if (!post) {
        const err = new http_error_1.default("Could not find post to delete.", 404);
        next(err);
        return err;
    }
    const images = post.content.filter((item) => item.type === "image");
    if (images.length > 0) {
        aws_sdk_1.default.config.update({
            secretAccessKey: AMZ_SECRET_ACCESS_KEY,
            accessKeyId: AMZ_ACCESS_KEY,
            region: "us-east-1",
        });
        const s3 = new aws_sdk_1.default.S3();
        const deleteImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                Bucket: image.bucket,
                Key: image.key,
            };
            try {
                yield s3.deleteObject(params).promise();
            }
            catch (error) {
                const err = new http_error_1.default("Could not delete image on S3.", 500);
                next(err);
                return err;
            }
        });
        images.forEach((item) => {
            deleteImage(item.image);
        });
    }
    const deleteCommentHandler = (comment) => __awaiter(void 0, void 0, void 0, function* () {
        let com;
        try {
            com = yield comment_1.commentModel.findById(comment._id).populate("creatorId");
        }
        catch (error) {
            const err = new http_error_1.default("Cannot delete comment.", 500);
            next(err);
            return err;
        }
        if (!com) {
            const err = new http_error_1.default("Cannot find comment to delete", 404);
            next(err);
            return err;
        }
        try {
            const sess2 = yield mongoose_1.default.startSession();
            sess2.startTransaction();
            yield com.remove();
            com.creatorId.comments.pull(comment);
            yield com.creatorId.save({ session: sess2 });
            yield sess2.commitTransaction();
        }
        catch (error) {
            const err = new http_error_1.default("Cannot delete comment.", 500);
            next(err);
            return err;
        }
    });
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield post.remove();
        post.admin.posts.pull(post);
        (_a = post.comments) === null || _a === void 0 ? void 0 : _a.forEach((comment) => {
            deleteCommentHandler(comment);
        });
        yield post.admin.save();
        yield sess.commitTransaction();
    }
    catch (error) {
        const err = new http_error_1.default("Cannot delete post.", 500);
        next(err);
        return err;
    }
    res.status(200).json({ message: "Post deleted." });
});
exports.deletePost = deletePost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    if (req.userId !== ADMIN_ID) {
        const err = new http_error_1.default("Invalid credentials.", 401);
        next(err);
        return err;
    }
    const { title, blurb, tags, headImg, headImgCaption, headImgAlt, day, month, year, numContent, numReferences, } = req.body;
    if (title === "" ||
        blurb === "" ||
        tags === "" ||
        headImg === "" ||
        headImgCaption === "" ||
        headImgAlt === "") {
        const err = new http_error_1.default("Heading information missing.", 422);
        next(err);
        return err;
    }
    const reqKeys = Object.keys(req.body);
    const filesArr = req.files;
    const content = (0, parseContent_1.default)(numContent, reqKeys, filesArr, req.body, next);
    const references = (0, parseReferences_1.default)(numReferences, reqKeys, req.body);
    let postToUpdate;
    try {
        postToUpdate = yield post_1.postModel.findById(postId);
    }
    catch (error) {
        const err = new http_error_1.default("MongoDB error finding post.", 500);
        next(err);
        return err;
    }
    if (!postToUpdate) {
        const err = new http_error_1.default("Could not find post to update.", 404);
        next(err);
        return err;
    }
    postToUpdate.title = title;
    postToUpdate.blurb = blurb;
    postToUpdate.tags = tags;
    postToUpdate.headImg = headImg;
    postToUpdate.headImgCaption = headImgCaption;
    postToUpdate.headImgAlt = headImgAlt;
    postToUpdate.content = content;
    postToUpdate.references = references;
    postToUpdate.updatedDay = day;
    postToUpdate.updatedMonth = month;
    postToUpdate.updatedYear = year;
    try {
        yield postToUpdate.save();
    }
    catch (error) {
        const err = new http_error_1.default("MongoDB could not save post.", 500);
        next(err);
        return err;
    }
    let imageKeys = [];
    for (const key of reqKeys) {
        if (/imageKey/.test(key)) {
            imageKeys.push(req.body[key]);
        }
    }
    const deleteImage = (keys) => __awaiter(void 0, void 0, void 0, function* () {
        if (keys.length > 0) {
            aws_sdk_1.default.config.update({
                secretAccessKey: AMZ_SECRET_ACCESS_KEY,
                accessKeyId: AMZ_ACCESS_KEY,
                region: "us-east-1",
            });
            const s3 = new aws_sdk_1.default.S3();
            for (const imgKey of keys) {
                const params = {
                    Bucket: AMZ_S3_BUCKET,
                    Key: imgKey,
                };
                try {
                    yield s3.deleteObject(params).promise();
                }
                catch (error) {
                    const err = new http_error_1.default("Could not delete image on S3.", 500);
                    next(err);
                    return err;
                }
            }
        }
    });
    try {
        yield deleteImage(imageKeys);
    }
    catch (error) {
        const err = new http_error_1.default("Could not delete image", 500);
        next(err);
        return err;
    }
    res.status(200).json({ message: "Updated post." });
});
exports.updatePost = updatePost;
const postComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const err = new http_error_1.default("Please enter a comment before submitting.", 422);
        next(err);
        return err;
    }
    const { newComment, postId, date } = req.body;
    const userId = req.userId;
    let user;
    try {
        user = yield user_1.userModel.findById(userId);
    }
    catch (error) {
        const err = new http_error_1.default("Adding comment failed, please try again later.", 500);
        next(err);
        return err;
    }
    if (!user) {
        const err = new http_error_1.default("This user does not exist. Please login again.", 422);
        next(err);
        return err;
    }
    const createdComment = new comment_1.commentModel({
        creatorId: userId,
        comment: newComment,
        postId,
        username: user.username,
        date,
    });
    let post;
    try {
        post = yield post_1.postModel.findById(postId);
    }
    catch (error) {
        const err = new http_error_1.default("Adding comment failed, please try again later.", 500);
        next(err);
        return err;
    }
    if (!post) {
        const err = new http_error_1.default("Cannot add a comment to a post that does not exist.", 422);
        next(err);
        return err;
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield createdComment.save();
        user.comments.push(createdComment);
        post.comments.push;
        yield user.save();
        yield post.save();
        yield sess.commitTransaction();
    }
    catch (error) {
        const err = new http_error_1.default("Could not save comment.", 500);
        next(err);
        return err;
    }
    socket_1.default.getIO().emit("comments", {
        action: "create",
        comment: createdComment,
    });
    try {
        yield transporter.sendMail({
            to: EMAIL,
            from: EMAIL,
            subject: `Someone added a comment to your blog.`,
            html: `<h1>${user.username} added a comment to the "${post.title}" post.</h1>
    <p>Comment: ${createdComment.comment}</p>
    <a href="${CLIENT_URL}/blog/${post._id.toString()}">View the comment</a>`,
        });
    }
    catch (error) {
        const err = new http_error_1.default("Could not add comment.", 500);
        next(err);
        return err;
    }
    res.status(201).json({ message: "Comment added" });
});
exports.postComment = postComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    let comment;
    try {
        comment = yield comment_1.commentModel.findById(commentId)
            .populate("creatorId")
            .populate("postId");
    }
    catch (error) {
        const err = new http_error_1.default("Cannot delete comment.", 500);
        next(err);
        return err;
    }
    if (!comment) {
        const err = new http_error_1.default("Cannot find comment to delete", 404);
        next(err);
        return err;
    }
    if (comment.creatorId._id.toString() !== req.userId) {
        const err = new http_error_1.default("You are not allowed to delete this comment", 401);
        next(err);
        return err;
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield comment.remove();
        comment.creatorId.comments.pull(comment);
        comment.postId.comments.pull(comment);
        yield comment.creatorId.save({ session: sess });
        yield comment.postId.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (error) {
        const err = new http_error_1.default("Cannot delete comment.", 500);
        next(err);
        return err;
    }
    socket_1.default.getIO().emit("comments", { action: "delete", commentId: comment._id });
    res.status(200).json({ message: "Comment deleted." });
});
exports.deleteComment = deleteComment;
