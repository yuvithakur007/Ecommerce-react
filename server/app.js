const express = require('express');
const session = require('express-session');
const passport = require('./config/auth');
const mongooseConnection = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRoutes); // Authentication routes
app.use('/', productRoutes); // Product routes
app.use('/', cartRoutes); // Cart routes
app.use('/', orderRoutes); // Order routes

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
