var express = require("express");
var router = express.Router();
const passport = require("passport");
const userAuth = passport.authenticate("jwt", { session: false });
console.log("ua",userAuth);
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", userController.getAllUser);
router.get("/protected", userAuth, userController.protected);
router.get("/favourite", userAuth, userController.getUserFavourites);
router.get(
  "/favourite/detailed",
  userAuth,
  userController.getDetailedFavourites
);
router.get("/reservations", userAuth, userController.getReservations);
router.post("/reservations", userAuth, userController.addReservation);

router.post("/", userController.registerUser);
router.post("/login", userController.login);
router.put("/:userId", userController.updateUser);
router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
