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

  boardRoutes.get("/all/:userId/", (req, res) => {
    let userId = req.params.userId;

    selectQueries.getUserBoards(userId).then(data => {
      res.json({ boards: data });
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
    let { deleteList, deleteCard } = deleteQureies;
    let boardId = req.body.boardId;

    deleteQureies
      .deleteBoard(boardId, deleteList, deleteCard)
      .then(() => res.json());
  });

  boardRoutes.post("/edit/title/", (req, res) => {
    let boardId = req.body.boardId;
    let title = req.body.title;
    updateQueries.updateBoardTitle(boardId, title).then(() => res.json());
  });

  boardRoutes.post("/favourite/", (req, res) => {
    let { boardId, favourite } = req.body;
    updateQueries.updateFavourite(boardId, favourite).then(res.json(favourite));
  });

  return boardRoutes;
};
