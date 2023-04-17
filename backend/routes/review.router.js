var express = require("express");
var router = express.Router();

const reviewController = require("../controllers/review.controller");

/* GET reviews listing. */
router.get("/", reviewController.getAllReview);
router.post("/", reviewController.registerReview);
router.put("/", reviewController.updateReview);
router.get("/:reviewId", reviewController.getReview);
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;
