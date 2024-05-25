const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Task = require("./db.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hasinichaithanya04:Mongodb123@cluster0.suc7fzf.mongodb.net/"
  )
  .then((res) => console.log("Connection to db is succcessfull"))
  .catch((err) => console.log("Error"));

// create task API
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get tasks API
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// Update task status API
app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/del", async (req, res) => {
  Task.deleteMany({})
    .then((response) => console.log(response))
    .catch(() => console.log("error"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
