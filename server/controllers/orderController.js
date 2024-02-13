const Order = require('../models/Order');

// Controller function to get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    // Assuming the user ID is available in req.user.id after authentication
    const orders = await Order.find({ user: req.user.id }).populate('items');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to place a new order
exports.placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  const order = new Order({
    user: req.user.id, // Assuming the user ID is available in req.user.id after authentication
    items,
    totalAmount,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
