const express = require("express");
const userRoutes = express.Router();
const jwt = require("jsonwebtoken");

module.exports = function(bcrypt, SECRET, insertQueries, selectQueries) {
  userRoutes.post("/login/", (req, res) => {
    let { username, password } = req.body;

    selectQueries.getUserInfo(username, password, bcrypt).then(userId => {
      if (!userId) res.json({ userId: null, username: null });
      let token = jwt.sign({ username, userId }, SECRET, {
        expiresIn: "24h" // expires in 24 hours
      });
      res.json({ userId, username, token });
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
          .then(userId => {
            let token = jwt.sign({ username, userId }, SECRET, {
              expiresIn: "24h" // expires in 24 hours
            });
            res.json({ userId, username, token });
          })
          .catch(error => res.json({ error: error.detail }));
      })
      .catch(error => console.log("error hashing password"));
  });

  userRoutes.get("/verify/:token", (req, res) => {
    let token = req.params.token;
    jwt.verify(token, SECRET, function(err, decoded) {
      res.json({ username: decoded.username, userId: decoded.userId });
    });
  });
  return userRoutes;
};
