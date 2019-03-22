module.exports = function selectQueries(knex) {
  return {
    getUserInfo: async(username, getUserBoards) => {
      try {
        let userId = await knex('user').select('id').where({username: username});
        userId = userId[0].id
        let boards = await getUserBoards(userId);
        return { userId, boards, username };
      }
      catch(error) {
        console.log('error getting user id', error)
      }
    },
    getUserBoards: async(userId) => {
      try {
        let userBoards = await knex('board').select('id', 'title', 'favourite').where({user_id: userId});
        return userBoards;
      }
      catch(error) {
        console.log('error getting user boards', error)
      }
    }
  }
}