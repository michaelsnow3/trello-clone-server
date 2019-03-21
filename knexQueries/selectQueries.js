module.exports = function selectQueries(knex) {
  return {
    getUserId: async(username) => {
      try {
        let userId = await knex('user').select('id').where({username: username});
        return userId[0];
      }
      catch(error) {
        console.log('error getting user id', error)
      }
    }
  }
}