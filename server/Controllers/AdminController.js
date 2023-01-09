import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../Models/adminModel.js";



//Admin Login
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await AdminModel.findOne({ username: username });
  
      if (admin) {
        const validity = await bcrypt.compare(password, admin.password);
  
        if (!validity) {
          res.status(400).json('Wrong password')
        } else {
          const token = jwt.sign(
            {
              username: admin.username,
              id: admin._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({ admin, token })
        }
      } else {
        res.status(404).json(" Enter Valid Credentials !");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };