const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
//signup

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password);

    // validate inputs
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
   const user=await User.create({
     name,
     email,
     password: hashedPassword,
  
   })
    await user.save();
    console.log(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Server error" });
  }
};

//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    //validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exists
    const user = await User.findOne({ email })
    // console.log(user)

    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    //compare password and generate token
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expiresIn: "5h",
        httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        message: "Logged in successfully",
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password Is Incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
