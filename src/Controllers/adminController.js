const { errorResponse, successResponse } = require("../helper/responseMsg");
const { AdminProfileModel } = require("../Models/adminModel");
const { ProductModel, CategoryModel } = require("../Models/userModel");

const adminProfile = async (req, res) => {
    const userId = req.userId
    try {
        const adminDetails = await AdminProfileModel.findOne(userId)
        return successResponse(req, res,  adminDetails, "Admin profile fetched successfully", 200);
    } catch (error) {
        return errorResponse(req, res, error.message, 400);
    }
}

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return errorResponse(req, res, "Category name is required", 400);
    }

    const exists = await CategoryModel.findOne({ name });
    if (exists) {
      return errorResponse(req, res, "Category already exists", 400);
    }

    const category = await CategoryModel.create({
      name,
      description,
    });

    return successResponse(req, res, category, "Category created successfully", 201);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


const listCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 });
    return successResponse(req, res, categories, "Category list fetched", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return errorResponse(req, res, "Category not found", 404);
    }

    return successResponse(req, res, category, "Category fetched successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const { name, description } = req.body;

    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return errorResponse(req, res, "Category not found", 404);
    }

    return successResponse(req, res, category, "Category updated successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const category = await CategoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      return errorResponse(req, res, "Category not found", 404);
    }

    return successResponse(req, res, null, "Category deleted successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


const addProduct = async (req, res) => {
  try {
    const { name, price, stock, categoryId, discount } = req.body;

    // Validation
    if (!name || !price || !stock || !categoryId) {
      return errorResponse(req, res, "All required fields must be provided", 400);
    }

    // Check category exists
    const categoryExists = await CategoryModel.findById(categoryId);
    if (!categoryExists) {
      return errorResponse(req, res, "Category not found", 404);
    }

    const product = await ProductModel.create({
      name,
      price,
      stock,
      categoryId,
      discount: discount || 0
    });

    return successResponse(req, res, product, "Product added successfully", 201);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

const listProducts = async (req, res) => {
    
  try {
    const products = await ProductModel.find()
      .populate("categoryId", "name description")
      .sort({ createdAt: -1 });

    return successResponse(req, res, products, "Products fetched successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


const productDetail = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findById(productId)
      .populate("categoryId", "name description");

    if (!product) {
      return errorResponse(req, res, "Product not found", 404);
    }

    return successResponse(req, res, product, "Product fetched successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return errorResponse(req, res, "Product not found", 404);
    }

    return successResponse(req, res, updatedProduct, "Product updated successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return errorResponse(req, res, "Product not found", 404);
    }

    return successResponse(req, res, null, "Product deleted successfully", 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};


module.exports = {
    adminProfile,
    addCategory,
    listCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    listProducts,
    productDetail,
    updateProduct,
    deleteProduct


}
