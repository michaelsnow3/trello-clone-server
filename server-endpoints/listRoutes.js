const express = require("express");
const listRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {
  
  listRoutes.post("/new/", (req, res) => {
    let title = req.body.listTitleValue;
    let boardId = req.body.boardId

    insertQueries.addlist(title, boardId)
  });

  return listRoutes;
};
