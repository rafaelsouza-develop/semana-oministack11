
exports.up = function(knex) {
    return knex.schema.createTable('user', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('telefone').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('user');
  };
  
