const express = require("express");
const userRoutes = express.Router();

module.exports = function(bcrypt, insertQueries, selectQueries) {
  userRoutes.post("/login/", (req, res) => {
    let { username, password } = req.body;

    selectQueries
      .getUserInfo(username, password, selectQueries.getUserBoards, bcrypt)
      .then(data => {
        res.json(data);
      });
  });

  userRoutes.post("/register/", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const saltRounds = 10;

    // hash input password
    bcrypt
      .hash(password, saltRounds)
      .then(function(hash) {
        insertQueries
          .addUser(username, hash)
          .then(data => res.json(data))
          .catch(error => res.json({ error: error.detail }));
      })
      .catch(error => console.log("error hashing password"));
  });

  return userRoutes;
};
