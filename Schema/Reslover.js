const users = require('../data.js');
console.log(users);
const reslovers ={
    Query : {
        getAllUsers :() => users
    }
}
module.exports = {reslovers};