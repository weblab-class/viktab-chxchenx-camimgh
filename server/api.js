/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

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

const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

const TOKEN_PATH = 'token.json';

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
  promises.push(Task.findOneAndUpdate({_id: req.body.task}, { $set: {name: req.body.name, description: req.body.description, points: req.body.points, finishBy: req.body.date}}));
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
    User.findById(req.body.user).then((user) => {
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

router.post("/updateuser", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {bio: req.body.bio, planet: req.body.planet, addToCal: req.body.addToCal}}).then(() => {
    console.log("updated user");
    res.send({});
  });
});

router.post("/userpoints", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {points: req.body.points}}).then(() => {
    User.findById(req.body.user).then((user) => {
      res.send(user);
    });
  });
});

router.post("/addplanet", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {points: req.body.points, planet: req.body.planet}, $addToSet: {planets: req.body.planet}}).then(() => {
    User.findById(req.body.user).then((user) => {
      res.send(user);
    });
  });
});

router.post("/setplanet", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {planet: req.body.planet} }).then(() => {
    User.findById(req.body.user).then((user) => {
      res.send(user);
    });
  });
})

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

// for debugging
router.post("/removetasks", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {tasks: []}}).then(() => {
    console.log("removed user tasks");
    res.send({});
  });
})

router.post("/removeplanets", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {planets: ["Mercury"], planet: "Mercury"}}).then(() => {
    console.log("removed user planets");
    res.send({});
  });
})

router.get("/code", (req, res) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Create oAuth2Client with credentials
    const credentials = JSON.parse(content);
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Get url to ask user for token
    fs.readFile(TOKEN_PATH, (err, token) => {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log(authUrl);
      res.send({url: authUrl});
    });
  });
});

router.post("/usercode", (req, res) => {
  User.findByIdAndUpdate({_id: req.body.user}, { $set: {code: req.body.code}}).then(() => {
    console.log("added gcal code for user");
    res.send({});
  });
});

router.post("/addevent", (req, res) => {
  fs.readFile('credentials.json', (err, content) => {
      console.log("reading file");
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    console.log(JSON.parse(content));
    authorize(JSON.parse(content), addEvent);
  });
  res.send({});
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  console.log(client_secret);
  console.log(client_id);
  console.log(redirect_uris);
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    console.log(TOKEN_PATH);
    console.log(token);
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log(oAuth2Client);
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function addEvent(auth) {
  const event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2021-01-28T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2021-01-28T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
