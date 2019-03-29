module.exports = function selectQueries(knex) {
  return {
    deleteBoard: async boardId => {
      try {
        let boardLists = await knex("list").where({ board_id: boardId });
        for (let listIndex = 0; listIndex < boardLists.length; listIndex++) {
          let listCards = await knex("card").where({
            list_id: boardLists[listIndex].id
          });
          for (let cardIndex = 0; cardIndex < listCards.length; cardIndex++) {
            // delete all cards for board's list
            await knex("card")
              .where({ id: listCards[cardIndex].id })
              .del();
          }
          // delete list
          await knex("list").where({ id: boardLists[listIndex].id }).del();
        }
        // delete board
        await knex("board")
          .where({ id: boardId })
          .del();
        return;
      } catch (error) {
        console.log("error deleting board", error);
      }
    }
  };
};
