require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let otpCounterRemaining = 4;

class AuthService {
  constructor() {}
  async login(input) {
    try {
      const { phone } = input;
      const usersCollection = mongoose.connection.db.collection("users");
      const exists = await usersCollection.find({ phone }).toArray();
      if (exists.length === 0) {
        return {
          message: "User doesn't exist. Please register",
        };
      }
      const loginTemplate = {
        loginOTP: Math.floor(Math.random() * 9000) + 1000,
        otpCounterRemaining: otpCounterRemaining--,
      };
      if (loginTemplate.otpCounterRemaining == 0) {
        return {
          message: "Maximum OTPs send limit reached",
        };
      }
      await usersCollection.findOneAndUpdate(
        { phone },
        {
          $set: {
            loginOTP: loginTemplate.loginOTP,
          },
        }
      );
      return {
        data: loginTemplate,
      };
    } catch (errors) {
      throw errors;
    }
  }

  async verifyOTP(input) {
    try {
      const { otp, phone } = input;
      const usersCollection = mongoose.connection.db.collection("users");
      const exists = await usersCollection.find({ phone }).toArray();
      if (exists.length === 0) {
        return {
          message: "User doesn't exist",
        };
      }
      if (exists[0].loginOTP == otp) {
        const token = jwt.sign(
          exists[0],
          process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );
        await usersCollection.findOneAndUpdate(
          { phone },
          {
            $unset: {
              loginOTP: "",
            },
          }
        );
        delete exists[0].loginOTP
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);
        const isoDate = currentDate.toISOString();
        return {
          message: "Login Successful",
          token,
          user: exists[0],
          tokenExpirationTime: isoDate
        };
      }
      return {
        message: "Invalid OTP",
      };
    } catch (errors) {
      throw errors;
    }
  }

  async register(input) {
    try {
      const { phone, username } = input;
      const usersCollection = mongoose.connection.db.collection("users");
      const exists = await usersCollection.find({ phone }).toArray();
      if (exists.length != 0) {
        return {
          message: "User already exists with this phone number",
        };
      }

      const registerTemplate = {
        phone: phone,
        name: username,
        userId: (Math.floor(Math.random() * 900000) + 100000).toString(),
        status: true,
      };
      await usersCollection.insertOne(registerTemplate);
      return {
        data: registerTemplate,
      };
    } catch (errors) {
      throw errors;
    }
  }
}

module.exports = { AuthService };
