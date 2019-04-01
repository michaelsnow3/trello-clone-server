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

    updateBoardTitle: async (boardId, title) => {
      await knex("board")
        .where({ id: boardId })
        .update({ title })
        .returning("*");
        return
    },

    updateListTitle: async (listId, title) => {
      await knex("list")
        .where({ id: listId })
        .update({ title })
        .returning("*");
        return
    }
  };
};
