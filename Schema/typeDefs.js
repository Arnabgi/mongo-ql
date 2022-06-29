const {gql} = require('apollo-server-express');
const typeDefs = gql 
`type User{
    name : String
    email  : String
},

#Queries
type Query{
    value : String,
    getAllUsers : [User]
}`;
module.exports = {typeDefs};