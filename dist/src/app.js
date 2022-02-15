"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const blog_routes_1 = __importDefault(require("./routes/blog-routes"));
const contact_routes_1 = __importDefault(require("./routes/contact-routes"));
const resume_routes_1 = __importDefault(require("./routes/resume-routes"));
const travelApp_routes_1 = __importDefault(require("./routes/travelApp-routes"));
const nlpApp_routes_1 = __importDefault(require("./routes/nlpApp-routes"));
const weatherJournal_routes_1 = __importDefault(require("./routes/weatherJournal-routes"));
const landing_page_routes_1 = __importDefault(require("./routes/landing-page-routes"));
const socket_1 = __importDefault(require("./socket"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
// app.use(
//   "/landing-page",
//   express.static(path.resolve(__dirname, "public", "landing-page"))
// );
// app.use(
//   "/my-first-blog",
//   express.static(path.resolve(__dirname, "public", "blog"))
// );
app.use('/landing-page', landing_page_routes_1.default);
app.get('/my-first-blog', (req, res, next) => {
    res.sendFile(path_1.default.resolve(__dirname, "./public/blog", "index.html"));
});
app.use("/travel-app", express_1.default.static(path_1.default.join(__dirname, "public", "travel-app")));
app.use("/sentiment-analysis-app", express_1.default.static(path_1.default.join(__dirname, "public", "nlp-app")));
app.use("/weather-journal-app", express_1.default.static(path_1.default.resolve(__dirname, "./public/weather-journal-app")));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "./public/website")));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/blog", blog_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/resume", resume_routes_1.default);
app.use("/api/travel-app", travelApp_routes_1.default);
app.use("/api/sentiment-analysis-app", nlpApp_routes_1.default);
app.use("/api/weather-journal-app", weatherJournal_routes_1.default);
app.use((req, res, next) => {
    res.sendFile(path_1.default.resolve(__dirname, "./public/website", "index.html"));
});
app.use((err, req, res, next) => {
    if (req.file) {
        fs_1.default.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if (res.headersSent) {
        return next(err);
    }
    res
        .status(err.code || 500)
        .json({ message: err.message || "An unknown error occurred." });
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    const server = app.listen(PORT || 8080);
    const io = socket_1.default.init(server);
    io.on("connection", (sock) => {
        console.log("client connected");
    });
    console.log("connects to mongoDB");
})
    .catch((err) => {
    console.log(err);
});
