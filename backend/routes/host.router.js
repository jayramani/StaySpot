var express = require("express");
var router = express.Router();

const hostController = require("../controllers/host.controller");

/* GET hosts listing. */
router.get("/", hostController.getAllHost);
router.post("/", hostController.registerHost);
router.put("/", hostController.updateHost);
router.get("/:hostId", hostController.getHost);
router.delete("/:hostId", hostController.deleteHost);

module.exports = router;
