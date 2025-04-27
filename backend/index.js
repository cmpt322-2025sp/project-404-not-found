const express = require("express");
var cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const mongodb = require('./core/DatabaseFunctions')
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || process.env.EXPRESS_PORT;
const routes = require('./routes');

app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ uri: MONGODB_URI, collection: process.env.MONGO_SESSIONS }),
    cookie: {
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        httpOnly: true
    }
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