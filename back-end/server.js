const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const TypeDefs = require('./graphql/schema');
const {
    BookingResolver,
    HotelResolver,
    UserResolver,
} = require ("./graphql/resolvers");

const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGODB_URL;

const connect = mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

connect.then((db) => {
    console.log('Connected to database.');
}, (err) => {
    console.log(err);
});

const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: [BookingResolver, HotelResolver, UserResolver]
});

const app = express();
//app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
    console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
