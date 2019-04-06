exports.up = function(knex, Promise) {
  return knex.schema.table("board", table => {
    table.string("colour").alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("board", table => {
    table.integer("colour").alter();
  });
};
