
exports.up = function(knex, Promise) {
    		return knex.schema
        		.createTable('themes',function(table){
            		table.increments('id');
            		table.string('name',20).notNullable();
        	});
	};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('themes');
};

