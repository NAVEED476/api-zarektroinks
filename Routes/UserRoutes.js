const userRouter = require("express").Router();
const UserDb = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { username,firstName, lastName, email, password, mobileNumber } = req.body;
  const newUser = new UserDb({
    username,
    firstName,
    lastName,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SEC_PASS).toString(),
    mobileNumber,
  });

  try {
    // Check if user with the same username already exists
    const existingUser = await UserDb.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // If user does not exist, save the new user
    const saveUser = await newUser.save();
    const {password, ...others} = saveUser._doc
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;
