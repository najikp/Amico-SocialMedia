import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
//get a User

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update a user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentuserId, currentUserAdminStatus, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

//Delete User

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentuserId, currentUserAdminStatus } = req.body;

  if (currentuserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

//Follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        const user = await UserModel.findById(_id)
        const data = {
          content: `${user.firstname} ${user.lastname} started following you`,
          time: new Date()
        }
        await UserModel.findByIdAndUpdate(id, { $push: { notifications: data } })
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      console.log(error, "this is error");
      res.status(500).json(error);
    }
  }
};

//UnFollow a user
export const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//clear notifications
export const clearNotifications = async (req, res) => {
  const userId = req.params.id;
  try {
    const data = [];
    await UserModel.findByIdAndUpdate({ _id: userId }, { notifications: data })
    res.status(200).json('Notications cleared');
  } catch (error) {
    console.log(error)
  }
}

//search user
export const searchUser = async (req, res) => {
  try {
    const keyword = req.query.name || "";
    const users = await UserModel.find({
      $or: [
        { username: { $regex: keyword, $options: "i" } },
        { firstname: { $regex: keyword, $options: "i" } },
        { lastname: { $regex: keyword, $options: "i" } },
      ],
    }).select({ username: 1, firstname: 1, lastname: 1, profilePicture: 1 });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
