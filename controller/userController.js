import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

const userController = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const user = await User.findOne({ username });

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      if (user) {
        return res.status(400).json({ error: "Người dùng đã tồn tại" });
      }
      const newUser = await new User({
        username,
        email,
        password: hashed,
      });
      await newUser.save();

      const accessToken = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_ACCESS_KEY
      );

      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      if (username) {
        user.username = username;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      }
      await user.deleteOne();
      res.json({ message: "Người dùng đã được xóa" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!user) {
        res.status(404).json("username hoặc email không hợp lệ!");
        return;
      }
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        res.status(404).json("password không hợp lệ!");
      }
      const accessToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_ACCESS_KEY
      );
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  logout: async (req, res) => {
    res.status(200).json("Đăng xuất!");
  },
};

export { userController };
