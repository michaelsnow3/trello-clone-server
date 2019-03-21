exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table){
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password_hash').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ])
};
