const User = require("../models/userModel");
const cloudinary = require("../connectors/cloudinary");

const isErrorWithMessage = (error) => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  );
};
const userCtrl = {
  createUser: async (req, res) => {
    try {
      const { name, age, address } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "Avatar file is required" });
      }

      const result = await cloudinary.uploader.upload(file.path);
      const user = new User({ name, age, avatarUrl: result.secure_url, address });
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      if (isErrorWithMessage(err)) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  getUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const users = await User.find().skip(skip).limit(limit);
      const total = await User.countDocuments();

      res.status(200).json({
        page,
        limit,
        total,
        users,
      });
    } catch (err) {
      if (isErrorWithMessage(err)) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      if (isErrorWithMessage(err)) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, age, address } = req.body;
      const file = req.file;
      let avatarUrl = req.body.avatarUrl;

      if (file) {
        const result = await cloudinary.uploader.upload(file.path);
        avatarUrl = result.secure_url;
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { name, age, avatarUrl, address },
        { new: true }
      );

      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (err) {
      if (isErrorWithMessage(err)) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      if (isErrorWithMessage(err)) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }

}

module.exports = userCtrl;