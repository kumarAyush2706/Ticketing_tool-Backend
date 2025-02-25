const sendToken = require("../middleware/Email");
const dbModal = require("../modal/dbmodal");

exports.generateToken = async (req, res) => {
  console.log("object");
  try {
    const { name, email,phone, query, description } = req.body;
    console.log(req.body);
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const data = await dbModal.create({
      name: name,
      email: email,
      phone:phone,
      query: query,
      description: description,
      token: token,
    });
    console.log(data);
    sendToken(email, token);
    return res.status(200).json({
      success: true,
      message: "Token generated successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error generating token",
      error: error,
    });
  }
};
exports.verify = async (req, res) => {
  try {
    const { token } = req.body;
    const data = await dbModal.findOne({ token: token });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      // data: data
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error verifying token",
      error: error.message,
    });
  }
};
exports.getQuery = async (req, res) => {
  try {
    const users = await dbModal.find();
    return res.status(200).json({
      success: true,
      message: "Query executed successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error executing query",
      error: error.message,
    });
  }
};
exports.getDescriptions = async (req, res) => {
  try {
    const users = await dbModal.find();
    return res.status(200).json({
      success: true,
      message: "Query Description executed successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error executing query",
      error: error.message,
    });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const queryId = req.params.id;

    // if (!["New", "Open", "In Progress", "Closed"].includes(status)) {
    //   return res.status(400).json({ success: false, message: "Invalid status" });
    // }

    const updatedQuery = await dbModal.findByIdAndUpdate(
      queryId,
      { status },
      { new: true }
    );

    if (!updatedQuery) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    res.json({ success: true, message: "Status updated successfully", data: updatedQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  } 
}