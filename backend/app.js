const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./utils/rateLimiter');
const { errors } = require('celebrate');

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(dbserver);

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '630fc301c348ea93b0f9659d',
  };

  next();
});
app.use(limiter);
app.use('/', router);

app.post('/signin', login);
app.post('/signup', createUser);

//Errors handling: validation errors from celebrate, common errors
app.use(errors());
// app.use((err, req, res, next) => {

// });

app.listen(PORT);
