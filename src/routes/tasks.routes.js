const express = require("express");
const router = express.Router();
const auth = require("../auth");

const Task = require("../models/task");

// get all tasks
router.get("/", auth, async (req, res) => {
  const task = await Task.find();
  res.json(task);
});

// get user tasks
router.get("/:userId", auth, async (req, res) => {
  const task = await Task.find({ user: req.params.userId });
  res.json(task);
});

// add a task
router.post("/:userId", auth, async (req, res) => {
  const { title, description } = req.body;
  const user = req.params.userId;
  const task = new Task({ title, description, user });
  await task.save();
  res.json({ status: "Task Saved" });
});

// update a task
router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };

  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Task Updated" });
});

// delete a task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Deleted" });
});

module.exports = router;
