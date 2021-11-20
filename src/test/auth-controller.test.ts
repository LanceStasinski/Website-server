import { expect } from "chai";
import sinon from "sinon";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { userModel as User } from "../models/user";
import { adminModel as Admin } from "../models/admin";
import { login } from "../controllers/auth-controllers";
import { beforeEach } from "mocha";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;

describe("Login", function () {
  let res = {};

  before(function (done) {
    mongoose
      .connect(MONGO_URI)
      .then((result) => {
        const user = new User({ username: "MochaTest", password: "MochaTest" });
        return user.save();
      })
      .then(() => done());
  });

  beforeEach(function () {
    res = {
      json: sinon.spy(),
      status: sinon.stub().returns({ end: sinon.spy() }), // to spy res.status(500).end()
    };
  });

  it("should throw error with status 500 if accessing database fails", function (done) {
    const findOne = sinon.stub(User, "findOne");
    findOne.throws();

    const req: any = {
      body: {
        username: "tester",
        password: "tester",
      },
    };
    login(req, res as any, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("code", 500);
      done();
    });
    findOne.restore();
  });

  it("should throw 403 error if existing user is not found", function (done) {
    const req: any = {
      body: {
        username: "UserThatDoesNotExist",
        password: "tester",
      },
    };
    login(req, {} as any, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("code", 403);
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
    const req: any = {
      body: {
        username: "MochaTest",
        password: "Wrongpass",
      },
    };
    login(req, {} as any, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("code", 403);
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
    User.deleteOne({ username: "MochaTest" })
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
