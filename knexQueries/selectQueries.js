module.exports = function selectQueries(knex) {
  return {
    getUserInfo: async (username, password, bcrypt) => {
      try {
        let userInfo = await knex("user")
          .select("id", "password_hash")
          .where({ username: username });

        // return false if username is incorrect
        if (!userInfo.length) return false;

        let userId = userInfo[0].id;
        let passwordHash = userInfo[0].password_hash;

        // bcrypt compare password hash
        const match = await bcrypt.compare(password, passwordHash);
        if (match) return userId;
        return false;
      } catch (error) {
        console.log("error getting user id", error);
      }
    },

    getUserBoards: async userId => {
      try {
        let userBoards = await knex("board")
          .select("id", "title", "favourite", "colour")
          .where({ user_id: userId })
          .orderBy("favourite", "desc");
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
          let listPosition = lists[index].position;
          boardLists.push({ listCards, listId, listTitle, listPosition });
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
