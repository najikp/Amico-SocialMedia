import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { otpSend } from "../Services/nodeMailer.js";



//OTP by using nodemailer
export const sendOtp = async (req, res) => {
  try {
    const { username } = req.body;


    console.log(req.body, 'fisrt emailllll');
    const emailExist = await UserModel.findOne({ username: username });

    if (emailExist) {
      res.status(200).send({
        message: "Email already exist",
        success: false
      });
    } else {
      otpSend(username)
        .then((response) => {
          console.log(response, 'kkkkkkkkkkkkkkkkkkkk');
          res.status(200).send({
            message: "OTP sent",
            response: response,
            success: true
          });
        })
        .catch((err) => console.log("ERROR", err));
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
};

//Registering a new User
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username } = req.body;

  try {
    const oldUser = await UserModel.findOne({ username });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "Username is Already registered" });
    }
    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login User

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json('Wrong password')
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token })
      }
    } else {
      res.status(404).json("User does not exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
