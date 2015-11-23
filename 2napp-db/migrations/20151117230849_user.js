
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('users',function(table){
          table.increments('id');
          table.string('firstname',20).notNullable();
          table.string('lastname',20).notNullable();
          table.string('username',20).notNullable();
          table.string('email').notNullable();
          table.string('hashedPassword').notNullable();
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
