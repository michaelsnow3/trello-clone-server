module.exports = function insertQueries(knex) {
  return {
    addBoard: async (title, userId) => {
      await knex("board").insert({ title, user_id: userId });
    },
    addList: async (title, boardId, position) => {
      await knex("list").insert({ title, board_id: boardId, position });
    },
    addCard: async (title, listId) => {
      await knex("card").insert({ title, list_id: listId });
    },
    addUser: async (username, hash) => {
      let userId = await knex("user")
        .insert({ username, password_hash: hash })
        .returning("id");
      return userId[0];
    }
  };
};
