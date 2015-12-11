
exports.up = function(knex, Promise) {
  return knex.schema
      .createTable('user',function(table){
          table.increments('id');
          table.string('firstname',20).notNullable();
          table.string('lastname',20).notNullable();
          table.string('email').notNullable();
          table.string('hashedPassword').notNullable();
          table.string('url_ava').defaultTo('images/ava.png');
          table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
          table.date('lastEnterDate');
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
