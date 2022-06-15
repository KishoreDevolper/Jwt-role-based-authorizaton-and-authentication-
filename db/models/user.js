const {Model} = require('objection');

class user extends Model {
    static get tableName(){
        return 'user'
    }
   
} 

module.exports = user