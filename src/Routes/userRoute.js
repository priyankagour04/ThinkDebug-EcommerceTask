const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const userController = require("../Controllers/UserController");
const router = express.Router();

router.get("/user_profile", authMiddleware, userController.userProfile);
router.post("/product_list", authMiddleware, userController.listProducts);
router.post("/place_order", authMiddleware, userController.placeOrder);
router.post("/order_details", authMiddleware, userController.orderDetails);



module.exports = router;
