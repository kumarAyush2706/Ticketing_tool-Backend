const User = require("../../modal/admin/signup");
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const existsUser = await User.findOne({ email });
    if (existsUser)
      return res.status(400).json({ message: "user already exists " });

    const newUSer = new User({ name, email, password:hashedPassword });
    await newUSer.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
 module.exports = signUp;
