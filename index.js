const {ApolloServer} = require ('apollo-server-express');
const express = require('express');
const {typeDefs} = require('./Schema/typeDefs');
const {reslovers} = require('./Schema/Reslover');
//const dotenv = require('dotenv');
//dotenv.config();
const port = 3100;
const app = express();
const apollo = async()=>{
    try {
        console.log("check...");
        const server = new ApolloServer({typeDefs,reslovers});
        await server.start();
        server.applyMiddleware({app});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.listen(port,()=>{
    apollo();
    console.log(`Server is starting ${port}`);
});