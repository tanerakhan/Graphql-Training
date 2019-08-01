const express = require('express');
const app = express();
var cors = require('cors')
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema')
require('dotenv').config()
const db = require('./helpers/db')();
app.use(cors())
app.use("/graphql", expressGraphQL({
        schema,
        graphiql:true
}));
app.listen(5000, () => {
    console.log('server is runnig..')
});