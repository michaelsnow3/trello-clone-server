const express = require("express");
const userRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {
  userRoutes.post("/login/", (req, res) => {
    let { username, passwordHash } = req.body;

    // add login credential check

    selectQueries
      .getUserInfo(username, selectQueries.getUserBoards)
      .then(data => {
        res.json(data);
      });
  });

  return userRoutes;
};
