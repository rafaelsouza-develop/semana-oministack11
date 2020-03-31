
exports.up = function(knex) {
    return knex.schema.createTable('photos', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('size').notNullable();
        table.decimal('key').notNullable();
        table.string('url').notNullable();    
        table.string('pet_id').notNullable();
        table
        .foreign('pet_id')
        .references('id')
        .inTable('pet');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('photos');
};
