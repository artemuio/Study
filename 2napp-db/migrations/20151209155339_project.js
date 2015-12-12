
exports.up = function(knex, Promise) {
	return knex.schema
			.createTable('project', function (table) {
				table.increments('id');
				table.string('name', 20).notNullable();
				table.string('type', 20).notNullable();
				table.integer('id_creator').unsigned().notNullable().references('id').inTable('user');
				table.integer('id_theme').unsigned().notNullable().references('id').inTable('themes');
				table.text('about');
				table.string('url_ava').defaultTo('images/projava.png');
				table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
			});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('project');
};