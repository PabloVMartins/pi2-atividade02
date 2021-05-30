
exports.up = (knex) => {
    return knex.schema.createTable('disponibilidade', (table) => {
      table.increments();
      table.boolean('disponivel').notNullable().defaultTo(true);

      table.integer('jogo_id').notNullable().unsigned();
      table.foreign('jogo_id')
					 .references('jogos.id')
					 .onDelete('restrict')
					 .onUpdate('cascade')
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('disponibilidade');