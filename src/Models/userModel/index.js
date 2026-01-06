const { model } = require('mongoose');

const userProfileSchema = require("./userProfile")
const productSchema = require("./product")
const orderSchema = require("./order")
const categorySchema = require("./categgory")


const UserProfileModel = model("user_profile", userProfileSchema)
const ProductModel = model("product", productSchema)
const OrderModel = model("order", orderSchema)
const CategoryModel = model("product_cateory", categorySchema)


module.exports  = {
    UserProfileModel,
    ProductModel,
    CategoryModel,
    OrderModel
}