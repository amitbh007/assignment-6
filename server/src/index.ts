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
        // credentials:true
    }))

    const appoloServer = new ApolloServer({
        schema:await buildSchema({
            resolvers:[UserResolver],
            validate:false
        }),
        //context will be accesible to all resolvers
        // context:({req,res})=> ({ req,res})
    })

    appoloServer.applyMiddleware({app,cors:false});

    app.listen(4000,()=>{   
        console.log("server started at localhost 4000")
    })
}

main();