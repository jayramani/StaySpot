
const controller = {};
const propertyModel = require("../models/property");
const reviewModel = require("../models/review");
const AWS = require('aws-sdk');
const axios = require("axios");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const fs = require("fs");

AWS.config.update({
  region:'us-east-1',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  sessionToken: process.env.SESSION_TOKEN
});

const s3 = new AWS.S3();
// const dynamodb = new AWS.DynamoDB({
//   credentials: credentials,
//   region: 'us-east-1' 
// });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const property = require("../models/property");
const { error } = require("console");
app.use(bodyParser.json());

// const table = 'properties';

controller.registerProperty = async (req, res, next) => {
    console.log("Calling from register property-----------------------------------")
    const userData = req.user;

    const image = Date.now() + req.file.originalname;

  var bucketName = "csci5409-00911903";
  
  console.log("++++++++++++++++++++++++++++++++++++++++");
  const params = { Bucket: bucketName, Key: image, Body: req.file.buffer };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("error is: " + err);
    } else {
      try{
      console.log("File uploaded Successfully & URL: " + data.Location);
      const S3image = data.Location;
      const newProperty = propertyModel({
        title: req.body.title,
        location:  req.body.location,
        description:  req.body.description,
        cleaningfee:  req.body.cleaningfee,
        servicefee:  req.body.servicefee,
        amenities:  req.body.amenities,
        bedrooms:  req.body.bedrooms,
        pricepernight: req.body.pricepernight,
        shortdescription:  req.body.shortdescription,
        S3Image:S3image
      });
      newProperty.save().then((property)=>res.json(property)).catch((error)=>console.log(error)); 
    }
    catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
  }
}
);

 const apiUrl =
        process.env.REACT_APP_API_GATEWAY_URL+"/mailsend";

      axios
        .post(apiUrl, {
          userEmail: userData.emailId,
          subject: `Successfully listed your property!!`,
          text: `Dear ${userData.firstName}, Thank you for hosting your property on StaySpot`
        })
        .then((response) => {
          // handle success
          console.log(response.data);
        })
        .catch((error) => {
          // handle error
          console.log("Everything is fine.");
      });

};

controller.getAllProperty = async (req, res, next) => {

  try {
    let property = await propertyModel.find({});
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
  
};

controller.getProperty = async (req, res, next) => {

  try {
    let property = await propertyModel.findOne({ _id: req.params.propertyId });
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.updateProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.findOneAndUpdate(
      { _id: req.params.propertyId },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.deleteProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.findByIdAndRemove(
      { _id: req.params.propertyId }
    );
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.addReview = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.body);
    req.body.user_id = req.user._id;
    let review = await reviewModel(req.body);
    await review.save();
    return res.status(200).json({ message: "success", data: review });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getReviews = async (req, res, next) => {
  try {
    let review = await reviewModel
      .find({ properties_id: req.params.propertyId })
      .populate("user_id");
    return res.status(200).json({ message: "success", data: review });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
module.exports = controller;
