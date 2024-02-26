const Product = require('../models/Product');


// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


exports.getAllProducts = async (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;
  let products;
  console.log(req.query);
  try {
    if (category === 'All' || sort === 'None') {
      products = await Product.find();
    } else {
      products = await Product.find({ category });
    }

    if (sort === 'Price: Low to High') {
      products = products.sort((a, b) => a.price - b.price);
    }
    if (sort === 'Price: High to Low') {
      products = products.sort((a, b) => b.price - a.price);
    }
    if (sort === 'Rating: Low to High') {
      products = products.sort((a, b) => a.avgRating - b.avgRating);
    }
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, image,category,avgRating} = req.body;
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      avgRating
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// exports.getFilterProducts = async (req,res) => {
//   const category = req.query.category;
//   const sort = req.query.sort;
//   let products;
//   try {
//     if (category === 'All') {
//       products = await Product.find();
//     } else {
//       products = await Product.find
//       ({category
//       });
//       }
//     if (sort === 'Price: Low to High') {
//       products = products.sort((a, b) => a.price - b.price);
//     }
//     if (sort === 'Price: High to Low') {
//       products = products.sort((a, b) => b.price - a.price);
//     }
//     if (sort === 'Rating: Low to High') {
//       products = products.sort((a, b) => a.avgRating - b.avgRating);
//     }
//     if (!products || products.length ===
//       0) {
//       return res.status(404).json({ message: 'No products found' });
//     }
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };