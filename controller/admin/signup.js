const User = require("../../modal/admin/signup");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    const existsUser = await User.findOne({ email });
    if (existsUser)
      return res.status(400).json({ message: "user already exists " });

    const newUSer = new User({ name, email, password });
    await newUSer.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
 module.exports = signUp;
