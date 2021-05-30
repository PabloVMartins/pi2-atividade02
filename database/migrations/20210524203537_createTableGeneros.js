
exports.up = (knex) => {
  return knex.schema.createTable('generos', (table) => {
    table.increments();
    table.string('name', 60).notNullable();
  })
};

exports.down = (knex) => knex.schema.dropTable('generos');