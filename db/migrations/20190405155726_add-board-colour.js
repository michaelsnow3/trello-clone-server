exports.up = function(knex, Promise) {
  return knex.schema.table("board", table => {
    table.integer("colour");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("board", table => {
    table.dropColumn("colour");
  });
};
