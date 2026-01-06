const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helper/responseMsg");
const { UserProfileModel } = require("../Models/userModel");
const { AdminProfileModel } = require("../Models/adminModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["x-token"];
  const userType = req.headers["user-type"];

  if (!token) {
    return errorResponse(req, res, "Token required", 401);
  }

  if (!userType) {
    return errorResponse(req, res, "User type is required", 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let userModel;
    switch (userType.toLowerCase()) {
      case "admin":
        userModel = AdminProfileModel;
        break;
      case "user":
        userModel = UserProfileModel;
        break;
      default:
        return errorResponse(req, res, "Invalid user type", 400);
    }

    const user = await userModel.findOne({ _id: decoded.id, token }).exec();

    if (!user) {
      return errorResponse(req, res, "Invalid or expired token", 401);
    }

    // Attach common info to the request
    req.userId = user._id;
    req.userEmail = user.email;
    req.user_type = user.user_type;
    req.user_type = userType.toLowerCase();

    next();
  } catch (err) {
    return errorResponse(req, res, "Invalid or expired token", 401);
  }
};

module.exports = authMiddleware;
