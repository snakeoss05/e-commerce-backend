import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function Login(req, res) {
  const { email, password } = req.body;

  const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      return res.status(400).json({ message: "User not registered." });
    }

    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, secretOrPrivateKey, { expiresIn: "1d" });

    res.json({ user: user, token: token, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    return res.json("Internal server error.", error);
  }
}
export async function Register(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json(
        { message: "User already exists" }
        // Pass status as the second argument
      );
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();
    return res.status(200).json({ message: "Register successful" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(400).json({ message: "Bad Request: " + error.message });
  }
}

export async function UpdateUser(req, res) {
  const userId = req.user._id;
  const { name, lastname, email, password } = req.body;
  if (!name && !lastname && !email && !password)
    return res.status(400).json({ message: "No data to update" });
  try {
    const updateFields = {};
    if (name) updateFields.name = name;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const results = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: updateFields },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "success updated", results: results });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
export async function getProfile(req, res) {
  const id = req.params;
  try {
    const results = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }).select("-password");
    return res.status(200).json({ results: results });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
