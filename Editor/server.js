const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const socketio = require('socket.io');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const docRoutes = require('./routes/docRoutes');
const Document = require('./models/Document');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/docs', docRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*' }
});

// 🔴 Real-time Collaboration
const documents = {}; // In-memory

io.on('connection', (socket) => {
  socket.on('join', async (docId) => {
    socket.join(docId);
    if (!documents[docId]) {
      const doc = await Document.findById(docId);
      documents[docId] = doc?.content || '';
    }
    socket.emit('load', documents[docId]);
  });

  socket.on('edit', ({ docId, content }) => {
    documents[docId] = content;
    socket.to(docId).emit('receive-changes', content);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
