exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('list', function(table){
      table.increments('id').primary();
      table.integer('board_id').references('id').inTable('board');
      table.string('title').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list')
  ])
};