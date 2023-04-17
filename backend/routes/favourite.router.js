var express = require("express");
var router = express.Router();

const favouriteController = require("../controllers/favourite.controller");
const passport = require("passport");
const userAuth = passport.authenticate("jwt", { session: false, failureMessage: true });
console.log(userAuth);
/* GET favourites listing. */
router.get("/", userAuth, favouriteController.getAllFavourite);
router.post("/", userAuth, favouriteController.addToFavourite);
router.put("/:favouriteId", userAuth, favouriteController.updateFavourite);
router.get("/:favouriteId", userAuth, favouriteController.getFavourite);
router.delete("/:propertyId", userAuth, favouriteController.deleteFavourite);

module.exports = router;
