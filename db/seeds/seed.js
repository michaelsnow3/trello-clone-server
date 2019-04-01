exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("card")
    .del()
    .then(() => {
      return knex("list").del();
    })
    .then(() => {
      return knex("board").del();
    })
    .then(() => {
      return knex("user").del();
    })
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        { id: 100, username: "mike", password_hash: "asdf" }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("board").insert([
        { id: 100, user_id: 100, title: "board title", favourite: true }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("board").insert([
        { id: 101, user_id: 100, title: "board2 title" }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("board").insert([
        { id: 102, user_id: 100, title: "board3 title" }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("list").insert([
        { id: 100, board_id: 100, title: "incomplete", position: 2 }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("list").insert([
        { id: 101, board_id: 100, title: "in progress", position: 3 }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("list").insert([
        { id: 102, board_id: 100, title: "complete", position: 1 }
      ]);
    })
    .then(function() {
      // Inserts seed entries
      return knex("card").insert([
        { id: 100, list_id: 100, title: "finish trello clone" }
      ]);
    });
};
