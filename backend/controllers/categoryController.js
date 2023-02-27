const Category = require("../models/category");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create Category
exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Get All Category
exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  let category = await Category.find();

  res.status(200).json({
    success: true,
    category,
  });
});

// Update Category

exports.updateCategory = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const newCategory = req.body;

    await Category.findOneAndUpdate({ _id: id }, newCategory);

    res.status(200).json({
      success: true,
      newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});
// Get Single  Category
exports.getSingleCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Category
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category Delete Successfully",
  });
});
