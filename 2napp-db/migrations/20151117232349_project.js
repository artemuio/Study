
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('projects',function(table){
            table.increments('id');
            table.string('name',20).notNullable();
            table.string('theme',20).notNullable();
            table.text('about');
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
