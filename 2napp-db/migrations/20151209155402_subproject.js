
exports.up = function(knex, Promise) {
	return knex.schema
			.createTable('subproject', function (table) {
				table.increments('id');
				table.string('name', 20).notNullable();
				table.integer('id_creater').unsigned().notNullable().references('id').inTable('user');
				table.integer('id_project').unsigned().notNullable().references('id').inTable('project');
				table.text('about');
				table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
			});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('subproject');
};
