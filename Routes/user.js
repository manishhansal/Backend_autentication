const express = require('express');
const app = express();
const userController = require('../Controllers/user');
app.use(express.json());

app.post('/book', userController.createUser);
app.get('/books', userController.getAllUsers)
app.delete('/book/:userId', userController.deleteUser);

app.post('/signUp', userController.signUp);
app.post('/signIn', userController.signIn);

module.exports = app;