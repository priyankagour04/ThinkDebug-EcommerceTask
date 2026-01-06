const { successResponse, errorResponse } = require("../helper/responseMsg");
const { UserProfileModel, ProductModel, OrderModel } = require("../Models/userModel")

const userProfile = async (req, res) => {
    const userId = req.userId
    try {
        const userDetails = await UserProfileModel.findOne(userId)
        return successResponse(req, res,  userDetails, "User profile fetched successfully", 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
}


const listProducts = async (req, res) => {
  try {
    const { search, category } = req.body;

    let filter = {};

    // Global search by product name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    let productsQuery = ProductModel.find(filter)
      .populate("categoryId", "name description")
      .sort({ createdAt: -1 });

    // Filter by category name
    if (category) {
      productsQuery = productsQuery.populate({
        path: "categoryId",
        match: { name: { $regex: category, $options: "i" } },
        select: "name description"
      });
    }

    let products = await productsQuery;

    // Remove products whose category didn't match
    if (category) {
      products = products.filter(p => p.categoryId !== null);
    }

    return successResponse(
      req,
      res,
      products,
      "Products fetched successfully",
      200
    );
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware
    const { productId, quantity  } = req.body;

    if (!productId) {
      return errorResponse(req, res, "Product ID is required", 400);
    }

    // Find product
    const product = await ProductModel.findById(productId);
    if (!product) {
      return errorResponse(req, res, "Product not found", 404);
    }

    // Check stock
    if (product.stock < quantity) {
      return errorResponse(req, res, "Insufficient stock", 400);
    }

    // Calculate price
    const discountAmount = (product.price * product.discount) / 100;
    const finalPrice = product.price - discountAmount;
    const totalAmount = finalPrice * quantity;

    // Create order
    const order = await OrderModel.create({
      userId,
      totalAmount,
      items: [
        {
          productId: product._id,
          quantity,
          price: finalPrice
        }
      ],
    });

    // Update product stock
    product.stock -= quantity;
    await product.save();

    return successResponse(
      req,
      res,
      order,
      "Order placed successfully",
      201
    );

  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

const orderDetails = async (req, res) => {
  try {
    const userId = req.userId; // from JWT middleware
    const { orderId } = req.body;

    if (!orderId) {
      return errorResponse(req, res, "Order ID is required", 400);
    }

    const order = await OrderModel.findOne({
      _id: orderId,
      userId
    })
      .populate("items.productId", "name price discount categoryId");

    if (!order) {
      return errorResponse(req, res, "Order not found", 404);
    }

    return successResponse(
      req,
      res,
      order,
      "Order details fetched successfully",
      200
    );
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


module.exports = {
    userProfile,
    listProducts,
    placeOrder,
    orderDetails
}