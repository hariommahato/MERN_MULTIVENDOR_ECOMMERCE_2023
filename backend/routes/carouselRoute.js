const express = require("express");
const {
  getAllCarousel,
  getCarouselDetail,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} = require("../controllers/carousel");

const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();
router.route("/carousel").get(getAllCarousel);

router.route("/carousel/new").post(createCarousel);

router
  .route("/carousel/:id")
  .get(getCarouselDetail)
  .put(updateCarousel)
  .delete(deleteCarousel);

module.exports = router;
