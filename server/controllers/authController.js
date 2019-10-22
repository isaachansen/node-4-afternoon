const users = require("../models/users");
let id = 1;

module.exports = {
  register: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;

    res.status(200).send(session.user);
  },

  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
      console.log(`${user.username} logged in`);
    } else {
      res.status(500).send("Unauthorized :')");
    }
  },

  signout: (req, res, next) => {
    console.log(`${req.session.user.username} logged out`);
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: (req, res, next) => {
    const { session } = req;
    console.log(`${session.user.username} got Information`);
    res.status(200).send(session.user);

  }
};
