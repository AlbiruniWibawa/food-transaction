const express = require('express');
const app = express();
const customerRoutes = require('./routes/customer.routes');
const foodRoutes = require('./routes/food.routes')
const transactionRoutes = require('./routes/transaction.routes');

app.use(express.json());

app.use('/api', customerRoutes);
app.use('/api', foodRoutes);
app.use('/api', transactionRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});