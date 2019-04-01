module.exports = function selectQueries(knex) {
  return {
    moveCard: async (targetCard, newList) => {
      await knex("card")
        .where({ id: targetCard.id })
        .update({
          list_id: newList.listId
        })
        .returning("*");
    },

    updateLists: async boardLists => {
      for (let listIndex = 0; listIndex < boardLists.length; listIndex++) {
        let list = boardLists[listIndex];
        await knex("list")
          .where({ id: list.listId })
          .update({ position: list.listPosition })
          .returning("*");
      }
      return;
    },

    updateBoardTitle: async (boardId, title) => {
      await knex("board")
        .where({ id: boardId })
        .update({ title })
        .returning("*");
      return;
    },

    updateListTitle: async (listId, title) => {
      await knex("list")
        .where({ id: listId })
        .update({ title })
        .returning("*");
      return;
    },

    updateCardTitle: async (cardId, title) => {
      await knex("card")
        .where({ id: cardId })
        .update({ title })
        .returning("*");
      return;
    }
  };
};
