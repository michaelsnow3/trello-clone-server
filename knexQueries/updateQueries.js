module.exports = function selectQueries(knex) {
  return {
    moveCard: async (targetCard, newList) => {
      await knex("card")
        .where({ id: targetCard.id })
        .update({
          list_id: newList.listId
        }).returning('*')
    }
  };
};
