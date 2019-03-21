exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('card', function(table){
      table.increments('id').primary();
      table.integer('list_id').references('id').inTable('list');
      table.string('title').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('card')
  ])
};