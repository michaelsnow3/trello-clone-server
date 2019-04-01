exports.up = function(knex, Promise) {
  return knex.schema.table("list", table => {
    table.integer("position").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("list", table => {
    table.dropColumn("position");
  });
};
