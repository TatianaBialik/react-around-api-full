const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes/index');
const { dbserver } = require('./utils/constants');
const limiter = require('./utils/rateLimiter');

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

app.listen(PORT);
