// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// get products, products details
app.use('/api/products', require('./routes/productRoutes'));

//login, user details
app.use('/api/user', require('./routes/authRoutes'));

// add cart, get cart, delete from cart
app.use('/api/carts', require('./routes/cartRoutes'));

// place order, get all orders
app.use('/api/orders', require('./routes/orderRoutes'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});