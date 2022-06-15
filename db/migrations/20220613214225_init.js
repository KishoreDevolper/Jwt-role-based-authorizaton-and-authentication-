
exports.up = function(knex) {
  return knex.schema
  .createTable('Demo',(table) =>{
  table.increments();
  table.string('name').notNullable();
  table.timestamps(true,true);  

})
.createTable('user',(table)=>{
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('roles').notNullable();
    
    table.timestamps(true,true);
})
};

exports.down = function(knex) {

  return knex.schema
.dropSchemaIfExists('user')

};
