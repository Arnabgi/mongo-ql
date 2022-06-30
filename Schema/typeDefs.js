const {gql} = require('apollo-server-express');
const typeDefs = gql 
`type User{
    _id   : String
    name : String
    email  : String
    password : String
}

#Queries
type Query{
    getAllUsers : [User],
    getUser(_id : ID!): User
}

type Mutation{
    add(
    name : String!,
    email : String!,
    password : String!
    ): User
}`;
module.exports = typeDefs;