
exports.up = function(knex, Promise) {
	return knex.schema
			.createTable('UserSubprojectBridge', function (table) {
				table.increments('id');
				table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
				table.integer('id_subproject').unsigned().notNullable().references('id').inTable('subproject');
				table.integer('id_role').unsigned().notNullable().references('id').inTable('roles');
			});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('UserSubprojectBridge');
};
