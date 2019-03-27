const express = require("express");
const boardsRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {
  boardsRoutes.get("/:userId/", (req, res) => {
    let userId = req.params.userId;

    selectQueries.getUserBoards(userId).then(data => {
      res.json({ boards: data });
    });
  });
  return boardsRoutes;
};