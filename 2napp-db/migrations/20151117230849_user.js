
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user', function (table) {
            table.increments('id');
            table.string('username')
            table.string('firstname', 20).notNullable();
            table.string('lastname', 20).notNullable();
            table.string('email').notNullable();
            table.string('hashedPassword').notNullable();
            table.string('avatarUrl').defaultTo('images/ava.png');
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
            table.timestamp('lastEnterDate').defaultTo(knex.fn.now());
            table.string('authenticationToken');
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user');
};
