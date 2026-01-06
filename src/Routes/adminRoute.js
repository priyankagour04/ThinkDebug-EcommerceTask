const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/admin_profile", authMiddleware, adminController.adminProfile);

// category curd apis
router.post("/add_category", authMiddleware, adminController.addCategory);
router.get("/list_category", authMiddleware, adminController.listCategory);
router.get("/category_detail", authMiddleware, adminController.getCategory);
router.put("/update_category", authMiddleware, adminController.updateCategory);
router.delete(
  "/delete_category",
  authMiddleware,
  adminController.deleteCategory
);

// product curd apis
router.post("/add_product", authMiddleware, adminController.addProduct);
router.get("/list_products", authMiddleware, adminController.listProducts);
router.get("/product_detail", authMiddleware, adminController.productDetail);
router.put("/update_product", authMiddleware, adminController.updateProduct);
router.delete("/delete_product", authMiddleware, adminController.deleteProduct);

router.get("/orders_list", authMiddleware, adminController.listOrders);
router.get("/order_detail", authMiddleware, adminController.orderDetails);

module.exports = router;
