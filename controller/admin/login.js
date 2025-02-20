const User = require("../../modal/admin/signup");

const loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email, password });

    if (!user)
      return res.status(400).json({ message: " Invalid email or password" });
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid request" });
  }
};
module.exports = loginpage;
