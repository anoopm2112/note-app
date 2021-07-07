const app = require('express').Router();
const user = require('../controllers/user.contollers');

app.post('/register', user.create); // Register a new User
app.post('/login', user.login); // Login a User

module.exports = app;