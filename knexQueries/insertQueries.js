module.exports = function insertQueries(knex) {
  return {
    addBoard: async (title, userId) => {
      await knex("board").insert({ title, user_id: userId });
    },
    addlist: async (title, boardId) => {
      await knex("list").insert({ title, board_id: boardId });
    },
    addcard: async (title, listId) => {
      await knex("card").insert({ title, list_id: listId });
    }
  };
};
