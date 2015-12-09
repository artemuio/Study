exports.up = function(knex, Promise) {
    		  return knex.schema
        		.createTable('message',function(table){
            		table.increments('id');
                    table.integer('id_chat').unsigned().notNullable().references('id').inTable('chat');
                    table.integer('id_user').unsigned().notNullable().references('id').inTable('user');
            		table.text('message');
            		table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        	   });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('message');
};