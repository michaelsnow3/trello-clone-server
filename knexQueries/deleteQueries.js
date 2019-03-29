module.exports = function selectQueries(knex) {
  return {
    deleteBoard: (boardId) => {
      knex("board").where({id: boardId}).del()
    }
  };
};
