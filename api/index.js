const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB! 🏓');
});

//middlewares.
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(3001, () => {
  console.log('API is running in port 3001! 👍');
});
