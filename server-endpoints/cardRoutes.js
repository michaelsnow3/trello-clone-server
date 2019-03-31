const express = require("express");
const cardRoutes = express.Router();

module.exports = function(
  insertQueries,
  selectQueries,
  updateQueries,
  deleteQueries
) {
  cardRoutes.post("/new/", (req, res) => {
    let title = req.body.titleValue;
    let listId = req.body.listId;

    insertQueries
      .addcard(title, listId)
      .then(res.json())
      .catch(error => console.log("error adding card to db", error));
  });

  cardRoutes.post("/move/", (req, res) => {
    let targetCard = req.body.targetCard;
    let newList = req.body.newList;
    updateQueries.moveCard(targetCard, newList).then(() => res.json());
  });

  cardRoutes.post("/del/", (req, res) => {
    let cardId = req.body.cardId;
    deleteQueries.deleteCard(cardId).then(() => res.json());
  });

  return cardRoutes;
};
