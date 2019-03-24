module.exports = function selectQueries(knex) {
  return {
    getUserInfo: async (username, getUserBoards) => {
      try {
        let userId = await knex("user")
          .select("id")
          .where({ username: username });
        userId = userId[0].id;
        let boards = await getUserBoards(userId);
        return { userId, boards, username };
      } catch (error) {
        console.log("error getting user id", error);
      }
    },

    getUserBoards: async userId => {
      try {
        let userBoards = await knex("board")
          .select("id", "title", "favourite")
          .where({ user_id: userId });
        return userBoards;
      } catch (error) {
        console.log("error getting user boards", error);
      }
    },

    getBoardContent: async (boardId, getListCards) => {
      try {
        let lists = await knex("list")
          .select("*")
          .where({ board_id: boardId });

        let boardLists = [];

        for (let index = 0; index < lists.length; index++) {
          let listCards = await getListCards(lists[index].id);
          let listId = lists[index].id;
          let listTitle = lists[index].title;
          boardLists.push({ listCards, listId, listTitle });
        }

        return boardLists;
      } catch (error) {
        console.log("error getting board content", error);
      }
    },

    getListCards: async listId => {
      let listCards = await knex("card")
        .select("*")
        .where({ list_id: listId });

      return listCards;
    }
  };
};
