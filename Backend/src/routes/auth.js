import express from "express";
import User from "../models/User.js";

const routes = express.Router();

// REGISTER
routes.post("/register", async (req, res) => {
    const { user, email, password } = req.body;
    try {
        const newUser = new User({ user, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
    // Duplicate key error code in MongoDB = 11000
    if (err.code === 11000) {
      if (err.keyValue.user) {
        return res.status(400).json({ error: "Username already taken" });
      }
      if (err.keyValue.email) {
        return res.status(400).json({ error: "Email already registered" });
      }
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default routes;