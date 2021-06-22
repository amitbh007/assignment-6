import "reflect-metadata";
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';


const main = async ()=>{
    //connect to db, add entities

    const app = express();

    app.use(cors({
        origin:'http://127.0.0.1:5500',
    }))

    const appoloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[UserResolver],
            validate:false
        }),
        
    })

    //add the express server as middleware and enable /graphql playground
    appoloServer.applyMiddleware({app,cors:false});

    app.listen(4000,()=>{   
        console.log("server started at localhost 4000")
    })
}

main();