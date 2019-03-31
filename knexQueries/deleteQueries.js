module.exports = function selectQueries(knex) {
  return {
    deleteBoard: async (boardId, deleteList) => {
      try {
        let boardLists = await knex("list").where({ board_id: boardId });
        for (let listIndex = 0; listIndex < boardLists.length; listIndex++) {
          await deleteList(boardLists[listIndex].id);
        }
        // delete board
        await knex("board")
          .where({ id: boardId })
          .del();
        return;
      } catch (error) {
        console.log("error deleting board", error);
      }
    },

    deleteList: async (listId, deleteCard) => {
      let listCards = await knex("card").where({
        list_id: listId
      });
      for (let cardIndex = 0; cardIndex < listCards.length; cardIndex++) {
        // delete all cards for list
        deleteCard(listCards[cardIndex].id);
      }
      // delete list
      await knex("list")
        .where({ id: listId })
        .del();
      return;
    },

    deleteCard: async cardId => {
      await knex("card")
        .where({ id: cardId })
        .del();
      return;
    }
  };
};
