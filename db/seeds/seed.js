exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('card').del()
    .then(() => {
      return knex('list').del()
    })
    .then(() => {
      return knex('board').del()
    })
    .then(() => {
      return knex('user').del()
    })
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 100, username: 'mike', password_hash: 'asdf'}
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('board').insert([
        {id: 100, user_id: 100, title: 'board title'}
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {id: 100, board_id: 100, title: 'incomplete'}
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {id: 101, board_id: 100, title: 'in progress'}
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {id: 102, board_id: 100, title: 'complete'}
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('card').insert([
        {id: 100, list_id: 100, title: 'finish trello clone'}
      ]);
    });
};
