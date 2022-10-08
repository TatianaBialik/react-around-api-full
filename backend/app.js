const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./utils/rateLimiter');
const { errors, Joi, celebrate } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect(dbserver);

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(cors());

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);

app.use('/', router);

//Errors handling: validation errors from celebrate, common errors
app.use(errors());
// app.use((err, req, res, next) => {

// });

app.listen(PORT);
