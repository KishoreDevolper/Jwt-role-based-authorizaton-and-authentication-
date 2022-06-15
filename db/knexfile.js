const {knexSnakeCaseMappers} = require('objection');



console.log("hello")

module.exports = {
 development: {
    client: 'pg',
    connection: {
      database: 'authorization',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds :{
      directory:'./seeds'
    },
    ...knexSnakeCaseMappers,  
  },

};
