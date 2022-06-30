const {ApolloServer} = require ('apollo-server-express');
const express = require('express');
const typeDefs = require('./Schema/typeDefs');
const resolvers = require('./Schema/Reslover');
const db_connect = require('./database_connection/db');
const port = 3100;
const apollo = async()=>{
    const app = express();
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers
        });

        await server.start();
        server.applyMiddleware({app});
        
        //define port.......
        app.listen(port,()=>{
            console.log(`Server is starting ${port}`);
        });
    } 
    catch (error) {
        throw error;
    }
}
apollo();

