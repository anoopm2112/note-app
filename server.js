const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true })) // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse requests of content-type - application/json
app.use(cors()) // Use this after the variable declaration

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on 5000 started');
});

const authRoute = require('./app/routes/user.routes');

//middleware
app.use(bodyParser.json())
//route middilewares
app.use('/api/user', authRoute);

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true,  useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

