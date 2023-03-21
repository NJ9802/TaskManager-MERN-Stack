const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth");

const User = require("../models/users");
const Tasks = require("../models/task");

// register endpoint
router.post("/register", async (req, res) => {
  try {
    //   hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create a new user and collect the data
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      admin: req.body.admin,
    });

    //   save the new user
    const result = await user.save();

    // return success if the new user is added successfully
    res.status(201).json({ message: "User Created Successfully", result });

    // catch error if the new user wasn't added successfully to the database
  } catch (err) {
    res.status(500).json({ message: "User already in use", err });
  }
});

//login endpoint
router.post("/login", async (req, res) => {
  try {
    // check if username exists
    const user = await User.findOne({ username: req.body.username });

    // if username exists, compare the password entered and the hashed password found
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // check if password matches
    if (!passwordCheck) {
      // return error response if password does not match
      return res.status(400).json({ message: "Password does not match" });
    }

    //   create JWT token
    const token = await jwt.sign(
      {
        userId: user._id,
        userName: user.username,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    //   return success response
    res.status(200).json({
      message: "Login Successful",
      userName: user.username,
      userId: user._id,
      admin: user.admin,
      token,
    });

    // catch error if username does not exist
  } catch (err) {
    res.status(404).json({ message: "Username not found", err });
  }
});

// Get registered users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err.message);
  }
});

// Get one User
router.get("/api/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("tasks");
    res.json(user);
  } catch (err) {
    res.json(err.message);
  }
});

// Delete users and their tasks
router.delete("/api/users/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    await Tasks.deleteMany({ user: id });

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted succesful" });
  } catch (err) {
    res.json(err.message);
  }
});

// Set admin to users
router.put("/api/users/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const admin = req.body.admin;

    await User.findByIdAndUpdate(id, { admin });
    res.json({ message: "User Updated" });
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
