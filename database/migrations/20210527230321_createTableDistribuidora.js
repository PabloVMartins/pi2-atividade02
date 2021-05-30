
exports.up = (knex) => {
    return knex.schema.createTable('distribuidoras', (table) => {
      table.increments();
      table.string('name', 60).notNullable();
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('distribuidoras');