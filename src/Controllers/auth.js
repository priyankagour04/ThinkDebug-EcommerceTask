const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserProfileModel } = require("../Models/userModel");
const { AdminProfileModel } = require("../Models/adminModel");
const { errorResponse, successResponse } = require("../helper/responseMsg");

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, user_type } = req.body;

    // Validation
    if (!firstname || !lastname || !email || !password || !user_type) {
      return errorResponse(req, res, "All fields are required");
    }

    // Check existing user
    const userExists = await UserProfileModel.findOne({
      email: email.toLowerCase(),
    });

    if (userExists) {
      return errorResponse(req, res, "Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserProfileModel.create({
      firstname,
      lastname,
      email: email,
      password: hashedPassword,
      user_type,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Save token in DB
    user.token = token;
    await user.save();

    return successResponse(
      req,
      res,
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        user_type: user.user_type,
        token,
      },
      "Signup successful"
    );
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, user_type } = req.body;

    if (!email || !password || !user_type) {
      return errorResponse(req, res, "Email, password and user type required");
    }

    let UserModel;
    switch (user_type.toLowerCase()) {
      case "admin":
        UserModel = AdminProfileModel;
        break;
      case "user":
        UserModel = UserProfileModel;
        break;
      default:
        return errorResponse(req, res, "Invalid role specified");
    }

    const user = await UserModel.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
      user_type,
    });

    if (!user) {
      return errorResponse(req, res, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(req, res, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    user.token = token;
    await user.save();

    return successResponse(
      req,
      res,
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        user_type: user.user_type,
        token,
      },
      "Login successful"
    );
  } catch (err) {
    return errorResponse(req, res, err.message);
  }
};


module.exports  =  {
    signup,
    login
}