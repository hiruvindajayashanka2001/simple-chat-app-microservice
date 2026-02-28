const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Auth Service running', port: process.env.PORT });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(' Auth Service connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(` Auth Service running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1);
  });