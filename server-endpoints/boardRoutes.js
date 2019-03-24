const express = require("express");
const boardRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {
  boardRoutes.get("/:id/", (req, res) => {
    let boardId = req.params.id;
    let getListCards = selectQueries.getListCards;

    selectQueries.getBoardContent(boardId, getListCards).then(data => {
      res.json({ boardLists: data });
    });
  });

  return boardRoutes;
};
