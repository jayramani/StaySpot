require("dotenv").config();
const { Strategy, ExtractJwt } = require("passport-jwt");
const SECRET = process.env.SECRET || "airbnbSECRETstring";
const userModel = require("../models/user");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "airbnbSECRETstring",
};

module.exports = (passport) => {
  console.log("passporttt",passport);
  try {
    passport.use(
      new Strategy(opts, async (payload, done) => {

        console.log(payload);
        
        let user = await userModel.findOne({ _id: payload._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    );
  } catch (e) {
    // return res.status(500).json({
    //   status: "Failed",
    //   error: e.message,
    // });
    console.log(e);
  }
};
