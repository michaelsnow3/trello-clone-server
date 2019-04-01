const express = require("express");
const boardRoutes = express.Router();

module.exports = function(
  insertQueries,
  selectQueries,
  updateQueries,
  deleteQureies
) {
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

  boardRoutes.post("/del/", (req, res) => {
    let deleteList = deleteQureies.deleteList;
    let boardId = req.body.boardId;
    deleteQureies.deleteBoard(boardId, deleteList).then(() => res.json());
  });

  boardRoutes.post("/edit/title/", (req, res) => {
    let boardId = req.body.boardId;
    let title = req.body.title;
    console.log(boardId, title)
    updateQueries.updateBoardTitle(boardId, title).then(() => res.json());
  });

  return boardRoutes;
};
