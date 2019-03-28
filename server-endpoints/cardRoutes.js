const express = require("express");
const cardRoutes = express.Router();

module.exports = function(insertQueries, selectQueries) {
  cardRoutes.post("/new/", (req, res) => {
    let title = req.body.titleValue;
    let listId = req.body.listId;

    insertQueries
      .addcard(title, listId)
      .then(res.json())
      .catch(error => console.log("error adding card to db", error));
  });

  return cardRoutes;
};
