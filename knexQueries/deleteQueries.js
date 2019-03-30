module.exports = function selectQueries(knex) {
  return {
    deleteBoard: async (boardId, deleteList) => {
      try {
        let boardLists = await knex("list").where({ board_id: boardId });
        for (let listIndex = 0; listIndex < boardLists.length; listIndex++) {
          await deleteList(boardLists[listIndex].id)
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

    deleteList: async listId => {
      let listCards = await knex("card").where({
        list_id: listId
      });
      for (let cardIndex = 0; cardIndex < listCards.length; cardIndex++) {
        // delete all cards for list
        await knex("card")
          .where({ id: listCards[cardIndex].id })
          .del();
      }
      // delete list
      await knex("list")
        .where({ id: listId })
        .del();
      return;
    }
  };
};
