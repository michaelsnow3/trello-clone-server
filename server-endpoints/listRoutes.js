const express = require("express");
const listRoutes = express.Router();

module.exports = function(insertQueries, selectQueries, deleteQueries) {
  listRoutes.post("/new/", (req, res) => {
    let title = req.body.listTitleValue;
    let boardId = req.body.boardId;

    insertQueries
      .addlist(title, boardId)
      .then(res.json())
      .catch(error => console.log("error adding list to db", error));
  });

  listRoutes.post('/del/', (req, res) => {
    let listId = req.body.listId;

    deleteQueries.deleteList(listId).then(() => res.json())
  })

  return listRoutes;
};
