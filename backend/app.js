const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./utils/rateLimiter');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
// const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { validateAuthentication } = require('./utils/validation');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(dbserver);

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(cors());

// app.post('/signin', validateAuthentication, login);
// app.post('/signup', validateAuthentication, createUser);

// app.use(auth);

app.use(requestLogger);
app.use('/', router);

app.use(errorLogger);

//Errors handling: validation errors from celebrate, common errors
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
