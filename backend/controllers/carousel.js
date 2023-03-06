const Carousel = require("../models/carousel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Product
exports.createCarousel = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "carousel",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  const carousel = await Carousel.create(req.body);
  res.status(201).json({
    success: true,
    carousel,
  });
});

// Get All Carousel
exports.getAllCarousel = catchAsyncError(async (req, res, next) => {
  let carousel = await Carousel.find();
  res.status(200).json({
    success: true,
    carousel,
  });
});

// Get single Carousel
exports.getCarouselDetail = catchAsyncError(async (req, res, next) => {
  const carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    carousel,
  });
});

exports.updateCarousel = catchAsyncError(async (req, res, next) => {
  let carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < carousel.images.length; i++) {
      await cloudinary.v2.uploader.destroy(carousel.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "carousel",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  carousel = await Carousel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    carousel,
  });
});

// Delete Product

exports.deleteCarousel = catchAsyncError(async (req, res, next) => {
  const carousel = await Carousel.findById(req.params.id);

  if (!carousel) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < carousel.images.length; i++) {
    await cloudinary.v2.uploader.destroy(carousel.images[i].public_id);
  }

  await carousel.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});
