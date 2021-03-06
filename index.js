const { ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");
const { PubSub }  =  require('graphql-subscriptions');
require("dotenv").config();
const resolvers = require("./Graphql/Resolvers/GeneralResolver")
const typeDefs  = require("./Graphql/TypeDefs")

const pubsub = new PubSub()
//*Creating an instance of the apollo server and connecting to the mongo db database
const server = new ApolloServer({ typeDefs, resolvers, context:({req})=>({req, pubsub}) });
dbConnect().catch((err) => console.log(err.message))
.then(()=>{
    return server.listen({port:5000})
})
.then((res)=>{
    console.log(`Server is running at: ${res.url}`);
})

//* Method for connecting the app to the mongoDB database
async function dbConnect() {
    let url = process.env.MONGODB_URL

    let connect = await mongoose.connect(
        url,
        { useNewUrlParser: true },
        () => console.log("Database connected Successfully")
    );

    return connect
}

