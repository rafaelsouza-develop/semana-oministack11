exports.up = function(knex) {
    return knex.schema.createTable('pet', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('hairColor').notNullable();
        table.decimal('size').notNullable();
        table.string('breed').notNullable();    
        table.string('user_id').notNullable();
        table
        .foreign('user_id')
        .references('id')
        .inTable('user');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pet');
};