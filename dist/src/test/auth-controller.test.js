"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
const auth_controllers_1 = require("../controllers/auth-controllers");
const mocha_1 = require("mocha");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
describe("Login", function () {
    let res = {};
    before(function (done) {
        mongoose_1.default
            .connect(MONGO_URI)
            .then((result) => {
            const user = new user_1.userModel({ username: "MochaTest", password: "MochaTest" });
            return user.save();
        })
            .then(() => done());
    });
    (0, mocha_1.beforeEach)(function () {
        res = {
            json: sinon_1.default.spy(),
            status: sinon_1.default.stub().returns({ end: sinon_1.default.spy() }), // to spy res.status(500).end()
        };
    });
    it("should throw error with status 500 if accessing database fails", function (done) {
        const findOne = sinon_1.default.stub(user_1.userModel, "findOne");
        findOne.throws();
        const req = {
            body: {
                username: "tester",
                password: "tester",
            },
        };
        (0, auth_controllers_1.login)(req, res, () => { }).then((result) => {
            (0, chai_1.expect)(result).to.be.an("error");
            (0, chai_1.expect)(result).to.have.property("code", 500);
            done();
        });
        findOne.restore();
    });
    it("should throw 403 error if existing user is not found", function (done) {
        const req = {
            body: {
                username: "UserThatDoesNotExist",
                password: "tester",
            },
        };
        (0, auth_controllers_1.login)(req, {}, () => { }).then((result) => {
            (0, chai_1.expect)(result).to.be.an("error");
            (0, chai_1.expect)(result).to.have.property("code", 403);
            done();
        });
    });
    // it("should throw 500 error if comparing passwords fails", function (done) {
    //   const compare = sinon.stub(bcrypt, "compare");
    //   compare.throws();
    //   const req: any = {
    //     body: {
    //       username: "tester",
    //       password: "tester",
    //     },
    //   };
    //   login(req, res as any, () => {}).then((result) => {
    //     expect(result).to.be.an("error");
    //     expect(result).to.have.property("code", 500);
    //     done();
    //   });
    //   compare.restore();
    // });
    it("should throw 403 error if password is incorrect", function (done) {
        const req = {
            body: {
                username: "MochaTest",
                password: "Wrongpass",
            },
        };
        (0, auth_controllers_1.login)(req, {}, () => { }).then((result) => {
            (0, chai_1.expect)(result).to.be.an("error");
            (0, chai_1.expect)(result).to.have.property("code", 403);
            done();
        });
    });
    // it("should throw 500 error if creating token fails", function (done) {
    //   const sign = sinon.stub(jwt, "sign");
    //   sign.throws();
    //   const req: any = {
    //     body: {
    //       username: "MochaTest",
    //       password: "MochaTest"
    //     }
    //   }
    //   login(req, {} as any, () => {}).then((result) => {
    //     expect(result).to.be.an("error");
    //     expect(result).to.have.property("code", 500);
    //     done();
    //   });
    //   sign.restore();
    // })
    // it("should respond with status of 200 when logging in successfully", function (done) {
    //   const req: any = {
    //     body: {
    //       username: "MochaTest",
    //       password: "Wrongpass",
    //     },
    //   };
    //   const res: any = {
    //   }
    // });
    after(function (done) {
        user_1.userModel.deleteOne({ username: "MochaTest" })
            .then(() => {
            return mongoose_1.default.disconnect();
        })
            .then(() => {
            done();
        });
    });
});
