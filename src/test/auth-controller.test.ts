import { expect } from "chai";
import Sinon, { StubbableType } from "sinon";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { userModel as User } from "../models/user";
import { adminModel as Admin } from "../models/admin";
import { login } from "../controllers/auth-controllers";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI!;

describe("Login", function () {
  before(function (done) {
    mongoose
      .connect(MONGO_URI)
      .then((result) => {
        const user = new User({ username: "MochaTest", password: "MochaTest" });
        return user.save();
      })
      .then(() => done());
  });

  it("should throw error with status 500 if accessing database fails", function (done) {
    const findOne = Sinon.stub(User, "findOne");
    findOne.throws();

    const req: any = {
      body: {
        username: "tester",
        password: "tester",
      },
    };
    login(req, {} as any, () => {}).then((result) => {
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
  //   const compare = Sinon.stub(bcrypt, "compare");
  //   compare.throws();

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
  //   compare.restore();
  // })

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
