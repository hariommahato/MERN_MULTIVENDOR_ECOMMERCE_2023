const express = require("express");
const {
  getAllCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  createCategory,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/category").get(getAllCategory);

router
  .route("/category/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);

router
  .route("/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);
router.route("/category/:id").get(getSingleCategory);

module.exports = router;
