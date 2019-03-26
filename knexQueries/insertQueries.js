module.exports = function insertQueries(knex) {
  return {
    addBoard: async (title, userId) => {
      await knex('board').insert({ title, user_id: userId });
    }
  };
};
