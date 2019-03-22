exports.up = function(knex, Promise) {
  return knex.schema.table('board', function(table) {
      table.boolean('favourite').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('board', function(table) {
      table.dropColumn('favourite');
  });
};
