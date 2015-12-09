
exports.up = function(knex, Promise) {
    		  return knex.schema
        		.createTable('UserProjectBridge',function(table){
            		table.increments('id');
            		table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
                    table.integer('id_project').unsigned().notNullable().references('id').inTable('project');
            		table.integer('id_role').unsigned().notNullable().references('id').inTable('roles');
        	   });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('UserProjectBridge');
};
