const CartItem = require('../models/CartItem');

// Controller function to get user's cart items
exports.getCartItems = async (req, res) => {
  try {
    // Assuming the user ID is available in req.user.id after authentication
    const cartItems = await CartItem.find({ user: req.user.id }).populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity, totalPrice } = req.body;

  const cartItem = new CartItem({
    product: productId,
    quantity,
    totalPrice,
    user: req.user.id, // Assuming the user ID is available in req.user.id after authentication
  });

  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findByIdAndRemove(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
