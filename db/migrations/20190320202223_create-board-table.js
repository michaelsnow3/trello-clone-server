exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('board', function(table){
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('user');
      table.string('title').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('board')
  ])
};
