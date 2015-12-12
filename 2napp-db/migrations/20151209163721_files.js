
exports.up = function(knex, Promise) {
	return knex.schema
			.createTable('files', function (table) {
				table.increments('id');
				table.string('name', 20).notNullable();
				table.integer('id_subproject').unsigned().notNullable().references('id').inTable('subproject');
				table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
				table.string('url').notNullable();
				table.integer('size').unsigned().notNullable();
				table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
			});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('files');
};
