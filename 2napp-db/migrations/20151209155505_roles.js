
exports.up = function(knex, Promise) {
    		  return knex.schema
        		.createTable('roles',function(table){
            		table.increments('id');
            		table.string('name').notNullable();
        	   });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('roles');
};