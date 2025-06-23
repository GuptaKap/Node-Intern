// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://anushkagupta5020:root@cluster0.5xgxif3.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes
app.use('/api', itemRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
