const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./utils/rateLimiter');
require('dotenv').config();

const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(dbserver);

app.use(helmet());
app.use(express.json());
app.use(limiter);
app.use(cors());
app.options('*', cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(requestLogger);
app.use('/', router);

app.use(errorLogger);

// Errors handling: validation errors from celebrate, common errors
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
