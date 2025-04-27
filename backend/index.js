const express = require("express");
var cors = require('cors');
require('dotenv').config();

const mongodb = require('./core/DatabaseFunctions');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || process.env.EXPRESS_PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
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