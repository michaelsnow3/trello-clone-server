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

  boardRoutes.post("/new/", (req, res) => {
    let title = req.body.boardTitleValue;
    let userId = req.body.userId;

    insertQueries.addBoard(title, userId).then(() => {
      selectQueries.getUserBoards(userId).then(data => res.json(data));
    });
  });

  return boardRoutes;
};
