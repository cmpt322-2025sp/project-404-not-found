const express = require("express");
var cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const mongodb = require('./core/DatabaseFunctions')
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const port = process.env.EXPRESS_PORT;
const routes = require('./routes');

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ uri: MONGODB_URI, collection: process.env.MONGO_SESSIONS })
}));

app.use(express.json());

app.use('/', routes);

mongodb.ConnectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('CNSL_SERV Server Started');
        });
    })
    .catch(err => {
        console.log('CNSL_ERR_SERV ' + err);
    });