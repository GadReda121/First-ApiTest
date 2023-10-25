const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/user_model");
const generateJWT = require("../utils/generateJWT");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require('bcryptjs');

const getAllUsers = asyncWrapper(async (req, res) => {

  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({
    status: httpStatusText.SUCCESS,
    results: users.length,
    data: { users },
  });
});

const register = asyncWrapper(
    async (req, res) => {
        const { firstName, lastName, email, password, role } = req.body;
        // password hashing
        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHashed,
            role,
            avatar: req.file.filename
        });

        // JWT Token
        const token = await generateJWT({
          email: newUser.email,
          id: newUser._id,
          role: newUser.role
        });
        newUser.token = token;

        await newUser.save();

        res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
        
    }
)

const login = asyncWrapper(
  async (req, res) => {
    const { email, password } = req.body;

      const user = await User.findOne({email: email});
      if(!user) return res.status(404).json({status: httpStatusText.FAIL, message: "User not found"})
      
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({status: httpStatusText.FAIL, message: "Invalid credentials"});

      if(user && isMatch) {
        const token = await generateJWT({
          email: user.email,
          id: user._id,
          role: user.role
        });
        user.token = token;
        res.status(200).json({status: httpStatusText.SUCCESS, data: {token}})
      }

  }
)

module.exports = {
    getAllUsers,
    register,
    login
}