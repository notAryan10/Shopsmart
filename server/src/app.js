const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const creatorRoutes = require('./routes/creatorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/creators', creatorRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CreatorDrop API is running',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;
