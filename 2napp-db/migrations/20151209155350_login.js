
exports.up = function(knex, Promise) {
	return knex.schema
			.createTable('login', function (table) {
				table.increments('id');
				table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
				table.string('ProvidedKey').notNullable();
				table.string('LoginProvider');
			});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('login');
};
