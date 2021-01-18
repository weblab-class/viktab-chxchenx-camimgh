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

router.get("/column", (req, res) => {
  Column.findById(req.query.columnid).then((column) => {
    res.send(column);
  });
});

router.post("/addtask", (req, res) => {
  Column.findOneAndUpdate({_id: req.body.column}, { $push: {tasks: req.body.task}}).then(() => console.log("added taskId to column"));
  Board.findOneAndUpdate({_id: req.body.board}, { $push: {tasks: req.body.task}}).then(() => console.log("added taskId to board"));
  res.send({});
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
