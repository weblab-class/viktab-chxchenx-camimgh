/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Board = require("./models/board");
const Column = require("./models/column");
const Task = require("./models/task");

const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");
const { query } = require("express");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.post("/addboard", (req, res) => {
  User.findOneAndUpdate({_id: req.body.user}, { $push: {boards: req.body.board}}).then(() => console.log("added boardId to user"));
  res.send({});
});

router.get("/userTasks", (req, res) => {
  Task.findByUser(req.query.userid).then((tasks) => {
    res.send(tasks);
  });
});

router.get("/board", (req, res) => {
  Board.findById(req.query.boardid).then((board) => {
    res.send(board);
  });
});

router.post("/board", (req, res) => {
  const newBoard = new Board({
    name: req.body.name,
    users: [req.body.user],
    columns: req.body.columns
  });
  newBoard.save().then((board) => res.send(board));
});

router.post("/leaveboard", (req, res) => {
  let promises = [];
  promises.push(Board.findOneAndUpdate({_id: req.body.board}, { $pull: {users: req.body.user}}));
  promises.push(User.findOneAndUpdate({_id: req.body.user}, { $pull: {boards: req.body.board}}));
  // TODO: remove user from all tasks too
  Promise.all(promises).then(() => {
    console.log("left board");
    res.send({});
  });
})

router.post("/removeboard", (req, res) => {
  let promises = [];
  for (const user of req.body.users) {
    promises.push(User.findOneAndUpdate({_id: user}, { $pull: {boards: req.body.board}}));
  }
  promises.push(Board.findByIdAndRemove({_id: req.body.board}));
  // TODO: remove this board's tasks for all users
  Promise.all(promises).then(() => {
    console.log("removed board");
    res.send({});
  });
});

router.get("/column", (req, res) => {
  Column.findById(req.query.columnid).then((column) => {
    res.send(column);
  });
});

router.post("/addtask", (req, res) => {
  let promises = [];
  promises.push(Column.findOneAndUpdate({_id: req.body.column}, { $addToSet: {tasks: req.body.task}}));
  promises.push(Board.findOneAndUpdate({_id: req.body.board}, { $addToSet: {tasks: req.body.task}}));
  Promise.all(promises).then(() => {
    console.log("added task to column and board");
    res.send({});
  });
});

router.post("/updatetask", (req, res) => {
  let promises = [];
  promises.push(Task.findOneAndUpdate({_id: req.body.task}, { $set: {name: req.body.name, description: req.body.description, finishBy: req.body.date}}));
  if (req.body.assignUser) {
    promises.push(Task.findOneAndUpdate({_id: req.body.task}, { $addToSet: {assignees: req.body.assignUser, assigneeNames: req.body.assignUsername}}));
    promises.push(User.findOneAndUpdate({_id: req.body.assignUser}, { $addToSet: {tasks: req.body.task}}));
  }
  if (req.body.unassignUser) {
    promises.push(Task.findOneAndUpdate({_id: req.body.task}, { $pull: {assignees: req.body.unassignUser, assigneeNames: req.body.unassignUsername}}));
    promises.push(User.findOneAndUpdate({_id: req.body.unassignUser}, { $pull: {tasks: req.body.task}}));
  }
  if (req.body.newcolumn) {
    promises.push(Column.findOneAndUpdate({_id: req.body.newcolumn}, { $addToSet: {tasks: req.body.task}}));
    promises.push(Column.findOneAndUpdate({_id: req.body.oldcolumn}, { $pull: {tasks: req.body.task}}));
  }
  Promise.all(promises).then(() => {
    const userId = req.body.assignUser || req.body.unassignUser
    User.findById(userId).then((user) => {
      res.send(user);
    });
  });
})

router.post("/deletetask", (req, res) => {
  let promises = [];
  promises.push(Column.findOneAndUpdate({_id: req.body.column}, { $pull: {tasks: req.body.task}}));
  promises.push(Board.findOneAndUpdate({_id: req.body.board}, { $pull: {tasks: req.body.task}}));
  promises.push(Task.findByIdAndRemove({_id: req.body.task}));
  Promise.all(promises).then(() => {
    console.log("deleted task");
    res.send({});
  });
})

router.post("/adduser", (req, res) => {
  let promises = []
  promises.push(Board.findOneAndUpdate({_id: req.body.board}, { $addToSet: {users: req.body.user}}));
  promises.push(User.findOneAndUpdate({_id: req.body.user}, { $addToSet: {boards: req.body.board}}));
  Promise.all(promises).then(() => {
    console.log("added user to board");
    res.send({});
  });
});

router.post("/column", (req, res) => {
  const newColumn = new Column({
    name: req.body.name,
  });
  newColumn.save().then((column) => {res.send(column)});
});

router.get("/task", (req, res) => {
  Task.findById(req.query.taskid).then((task) => {
    res.send(task);
  });
});

router.post("/task", (req, res) => {
  const newTask = new Task({
    name: req.body.name
  });
  newTask.save().then((task) => {res.send(task)});
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
