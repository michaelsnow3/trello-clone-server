exports.up = function(knex, Promise) {
  return knex.schema.table('list', function (table) {
    table.dropUnique('position');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('list', function (table) {
    table.unique('position');
  });
};
