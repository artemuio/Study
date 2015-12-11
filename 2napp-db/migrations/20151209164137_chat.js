
exports.up = function(knex, Promise) {
    		  return knex.schema
        		.createTable('chat',function(table){
            		table.increments('id');
                    table.integer('id_project').unsigned().notNullable().references('id').inTable('project');
                    table.integer('id_subproject').unsigned().notNullable().references('id').inTable('subproject');
        	   });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('chat');
};
