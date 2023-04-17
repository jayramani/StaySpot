
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

    // const paramsForCount = {
    //   TableName: table,
    //   Select: 'COUNT'
    // };

    // dynamodb.scan(paramsForCount, function(err, data) {
    //   if (err) {
    //     console.log(err, err.stack);
    //   } else {
    //     console.log(`Number of items in table ${paramsForCount.TableName}: ${data.Count}`);
    //   }
    // });

    // const tableData = {
    //   propertyId: { S: '4' },
    //   title: { S: req.body.title },
    //   location: { S: req.body.location },
    //   pricepernight: { S: req.body.pricepernight},
    //   description: { S: req.body.description },
    //   cleaningfee: { S: req.body.cleaningfee },
    //   servicefee: { S: req.body.servicefee },
      // amenities: { S: req.body.amenities},
      // bedrooms: { S: req.body.bedrooms },
      // shortdescription: { S: req.body.amenities },
      // imageName: { S: req.body.imageName},
      // isAvailable: { BOOL: req.body.isAvailable},
      // ratings: { S: '3' }
    // };

    // console.log(data);

    // const paramsForPut = {
    //   TableName: table,
    //   Item: tableData
    // };

    // dynamodb.putItem(paramsForPut, (err, data) => {
    //   if (err) {
    //     console.log('Error:', err);
    //     res.status(500).send('Error');
    //   } else {
    //     console.log('Success added data:', data);
    //     res.status(200).send('Success');
    //   }
    // });


  // try {
    
  //   let property = new propertyModel({
  //     title: req.body.title,
  //     location:  req.body.location,
  //     description:  req.body.description,
  //     cleaningfee:  req.body.cleaningfee,
  //     servicefee:  req.body.servicefee,
  //     amenities:  req.body.amenities,
  //     bedrooms:  req.body.bedrooms,
  //     pricepernight: req.body.pricepernight,
  //     shortdescription:  req.body.shortdescription,
  //     imageName: req.body.imageName
  //   });
  //   property.save();
  //   return res.status(200).json({ message: "success", data: property });
  // } catch (e) {
  //   res.status(500).json({
  //     message: e.message,
  //   });
  // }
};

controller.getAllProperty = async (req, res, next) => {

  // const dynamodb = new AWS.DynamoDB.DocumentClient();

// Set the table name
// const tableName = table;

// Define the parameters for the scan operation
// const params = {
//     TableName: tableName
// };

// Call the scan method to fetch all the data from the table


  try {
    let property = await propertyModel.find({});
    // console.log(property);
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
  
  // try {
  //   dynamodb.scan(params, (err, data) => {
  //     if (err) {
  //        console.error('Unable to scan the table:', err);
  //     } else {
  //       console.log(data.Items);
  //       let property = AWS.DynamoDB.Converter.output(data.Items);
        // console.log('Scan succeeded:', unmarshall(data.Items));

  //       return res.status(200).json({ message: "success from dynamo", data: JSON.stringify(property, null, 2) });
  //     }
  //   });
    
    
  // } catch (e) {
  //   res.status(500).json({
  //     message: e.message,
  //   });
  // }
};

controller.getProperty = async (req, res, next) => {

// Create a new DocumentClient
// const docClient = new AWS.DynamoDB.DocumentClient();

// Define the parameters for the get operation
// const params = {
//   TableName: table,
//   Key: {
//     'propertyId': '1'
//   }
// };

// Call the get method of the DocumentClient to fetch the item
// docClient.get(params, function(err, data) {
//   if (err) {
//     console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
//   } else {
//     console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
//   }
// });

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
