const sendToken = require("../middleware/Email");
const dbModal = require("../modal/dbmodal");

exports.generateToken = async (req, res) => {
    console.log("object");
    try {
  const {name, email, query, description } = req.body;
  console.log(req.body)
  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const data = await dbModal.create({
    name: name,
    email: email,
    query: query,
    description: description,
    token:token
    });
console.log(data)
sendToken(email,token)
return res.status(200).json({
    success:true,
    message: "Token generated successfully",
    data: data

})
    }
catch(error){
    res.status(400).json({
        success:false,
        message: "Error generating token",
        error:error
        })
}
}
exports.verify = async (req, res) => {
    try {
        const { token } = req.body;
        const data = await dbModal.findOne({ token: token });
        if(!data){
            return res.status(400).json({
                success: false,
                message: "Invalid token",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Token verified successfully",
            // data: data
            })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error verifying token",
            error:error.message,
            })
        
    }
}
exports.getQuery = async (req, res) => {
    try {
        const users = await dbModal.find();
        return res.status(200).json({
            success: true,
            message: "Query executed successfully",
            data: users
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error executing query",
            error:error.message
        })
    }
}
exports.getDescriptions = async (req, res) => {
    try {
        const users = await dbModal.find();
        return res.status(200).json({
            success: true,
            message: "Query Description executed successfully",
            data: users
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error executing query",
            error:error.message
        })
    }
}