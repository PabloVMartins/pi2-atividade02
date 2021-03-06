
exports.up = (knex) => {
	return knex.schema.createTable('jogos', (table) => {
		table.increments();
		table.string('titulo', 80).notNullable();
		table.string('foto').notNullable();
		table.integer('ano', 4).notNullable();
		table.decimal('preco', 9.2).notNullable();
		table.boolean('destaque').notNullable().defaultTo(false);

		// cria campo de relacionamento com a tabela marcas
		table.integer('genero_id').notNullable().unsigned();
		table.foreign('genero_id')
			 .references('generos.id')
			 .onDelete('restrict')
			 .onUpdate('cascade')

		table.integer('distribuidora_id').notNullable().unsigned();
		table.foreign('distribuidora_id')
			 .references('distribuidoras.id')
			 .onDelete('restrict')
			 .onUpdate('cascade')

		// cria os campos created_at e updated_at
		table.timestamps(true, true);
	})
};

exports.down = (knex) => knex.schema.dropTable('jogos');