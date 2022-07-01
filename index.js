const {ApolloServer} = require ('apollo-server-express');
const express = require('express');
const typeDefs = require('./Schema/typeDefs');
const resolvers = require('./Schema/Reslover');
const db_connect = require('./database_connection/db');
const dotenv = require('dotenv');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const middlewares = require('./Middleware/auth');
dotenv.config();
const port = 3100;
const apollo = async()=>{
    const app = express();
    try {
        const schema = makeExecutableSchema({ typeDefs, resolvers });
        const schemaWithMiddleware = applyMiddleware(
            schema,
            middlewares.data
        )
        const server = new ApolloServer({
            schema : schemaWithMiddleware,
            context : ({req,res})=>{
                return {req,res};
            }
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

