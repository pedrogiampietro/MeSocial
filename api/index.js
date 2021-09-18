const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB! 🏓');
});

app.listen(3001, () => {
  console.log('API is running in port 3001! 👍');
});
