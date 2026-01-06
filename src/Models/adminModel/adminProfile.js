const mongoose = require("mongoose");

const AdminProfileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  user_type: {
    type: String,
    require: true,
    enum : "admin"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: false,
    unique: true,
    default: "",
  },
  phone_code: {
    type: String,
    trim: true,
    required: false,
    default: "",
  },
  
  line1: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  postal_code:{
    type: String,
    default : ""
  },
  profile_pic: {
    fileName: { type: String },
    fileExtension: { type: String },
    url: { type: String },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
  fcmTokens: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = AdminProfileSchema;
