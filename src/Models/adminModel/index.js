const { model } = require('mongoose');

const adminProfileSchema = require("./adminProfile")

const AdminProfileModel = model("admin_profile", adminProfileSchema)

module.exports  = {
    AdminProfileModel
}