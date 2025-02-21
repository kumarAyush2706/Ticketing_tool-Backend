const User = require("../../modal/admin/signup");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs');

exports.loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if(!email || !password){
      return res.status(400).json({
          success:false,
          message:"Invalid Email or password"
      })
  }

    const user = await User.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
     await res.cookie("user", JSON.stringify(user), {
          httpOnly: true, // Prevents JavaScript from accessing it (for security)
          secure: false, // Change to `true` in production (requires HTTPS)
          sameSite: "Lax", // Helps prevent CSRF attacks
        });
      return res.status(200).json({
          success: true,
          message: "User login successfully",
          user: user
          });
  }

    // if (!user)
    //   return res.status(400).json({ message: " Invalid email or password" });
    // return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid request" });
  }
};

exports.me = async (req, res) => {
  const userCookie = req.cookies.user;

  if (!userCookie) {
    return res.status(401).json({ success: false, message: "No user found" });
  }

  return res.json({ success: true, user: JSON.parse(userCookie) });
}

exports.logout = async (req, res) => {
      res.clearCookie("user");
      res.json({
          success:true,
           message: "Logged out successfully"
         });
 
}
// module.exports = loginpage;
