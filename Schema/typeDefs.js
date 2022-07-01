const {gql} = require('apollo-server-express');
const typeDefs = gql 
`type User{
    _id   : String
    name : String
    email  : String
    password : String
}

type Message{
    status  : Int
    message : String
    data : String
}

type response{
    data : User,
    message : Message
}

type all_response{
    data : [User],
    message : Message
}

#Queries
type Query{
    getAllUsers : all_response,
    getUser(_id : ID!): response,
}

type Mutation{
    add(
    name : String!,
    email : String!,
    password : String!
    ): Message,

    delete(
        _id : ID!
    ): Message,

    update(
        _id : ID!
        name : String,
        email : String,
        password : String
    ): Message,

    logIn(
        email : String!,
        password : ID!
    ):Message
}`;
module.exports = typeDefs;