const User = require("../models/User");
const jwt = require("jsonwebtoken");

const bcrypt = require('bcryptjs');

exports.loginOrCreateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // If user doesn't exist, create a new user
    if (!user) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({ email, password: hashedPassword });
      await user.save();
    } else {
      // Check if the provided password matches the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "knolskape");
    res.status(200).send({
      success: true,
      message: "Login Done",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};






// exports.loginOrCreateUser = async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(req.body);
//   try {
//     let user = await User.findOne({ email });

//     // If user doesn't exist, create a new user
//     if (!user) {
//       user = new User({ email, password });
//       await user.save();
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "knolskape");
//     res.status(200).send({
//       success: true,
//       message: "Login Done",
//       // user: {
//       //   email: user.email,
//       //   id: user._id,
//       // },
//       token: token,
//     });
//     // Send JWT token to the client
//     // res.json({ token });
//     // res.redirect('/api/products');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


exports.getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "knolskape");
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    res.status(200).json({
      ok: true,
      message: "User details",
      user: user,
    });
  } catch (error) {
    console.error("Error getting user details:", error);

    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};



