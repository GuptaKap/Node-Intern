const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const uploadRoutes = require('./routes/uploadRoutes');
const githubRoutes = require('./routes/githubRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/github', githubRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
