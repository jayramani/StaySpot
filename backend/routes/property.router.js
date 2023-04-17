var express = require("express");
var router = express.Router();

const propertyController = require("../controllers/property.controller");
const passport = require("passport");
const userAuth = passport.authenticate("jwt", { session: false });
const multer = require("multer");
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploadedFiles/')
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname)
    }
    })

var upload = multer({ storage: storage })

const upload1 = multer({storage: multer.memoryStorage()})

/* GET propertys listing. */
router.get("/", propertyController.getAllProperty);

router.post("/", upload1.single("image"), userAuth,propertyController.registerProperty);

router.post("/review", userAuth, propertyController.addReview);
router.post("/image", upload.single('image'), (req,res) => {
    console.log(req.file);
    if(!req.file){
        res.send({code : 500, msg : 'error'})
    }
    else{
        res.send({code : 200, msg : 'upload successful'})
    }

});
router.get("/image/:imageName", (req,res) => {
    console.log(__dirname.substring(0, __dirname.length - 7));
    var options = {
        root: path.join(__dirname.substring(0, __dirname.length - 7) + "/uploadedFiles/")
    };
    //  res.send({"loc": __dirname.substring(0, __dirname.length - 7) + "/uploadedFiles/" + req.params.imageName})
    res.sendFile( req.params.imageName, options, function (err) {
        if (err) {
            res.send(err);
        } else {
            console.log('Sent:', req.params.imageName);
        }
    })
});
router.get("/review/:propertyId", propertyController.getReviews);

router.put("/:propertyId", propertyController.updateProperty);
router.get("/:propertyId", propertyController.getProperty);
router.delete("/:propertyId", propertyController.deleteProperty);

module.exports = router;
