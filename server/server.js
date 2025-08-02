const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/testRoutes');


const app = express();

// Middleware (MUST be before routes)
app.use(cors());
app.use(express.json()); // <<== This is important!

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
