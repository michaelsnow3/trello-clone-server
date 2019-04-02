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

  return userRoutes;
};
