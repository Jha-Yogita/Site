const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const awesomeRoutes = require('./routes/awesomeRoutes');
const todoRoutes = require('./routes/todoRoutes');
const varshaRoutes = require('./routes/varshaRoutes');

const app = express();


app.use(cors({
    origin: 'https://website-4vbd.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/awesome', awesomeRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/varsha', varshaRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('🌸 MongoDB Connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

module.exports = app;
