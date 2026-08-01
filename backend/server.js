const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/clients', require('./routes/clientRoutes'));
// app.use('/api/public', require('./routes/publicRoutes'));
// app.use('/api/files', require('./routes/fileRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('26i Engineering Consultations API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
