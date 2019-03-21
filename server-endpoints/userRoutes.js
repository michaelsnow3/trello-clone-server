const express = require("express");
const userRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {

  userRoutes.post('/login/', (req, res) => {
    let { username, passwordHash } = req.body;

    // add login credential check

    selectQueries.getUserId(username).then(data => {
      let userId = data.id
      res.json({userId, username})
    })

  })

  return userRoutes;
};
