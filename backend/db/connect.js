const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

const getSecrets = require('./getSecretAccess');

const connectToDb = async () => {
  try {

    const secrets = await getSecrets();
    // console.log(secrets);
    await mongoose.connect(secrets.MONGO_URI);
    console.log("Connected to mongo!!!");
    return 1;
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
    return 0;
  }
};

module.exports = connectToDb;
 