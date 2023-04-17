const controller = {};
const reservationModel = require("../models/reservation");

controller.addReservation = async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.user_id = req.user._id;

    let reservation = new reservationModel(req.body);
    await reservation.save();
    return res.status(201).json({ message: "success", data: reservation });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getAllReservation = async (req, res, next) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getReservation = async (req, res, next) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.updateReservation = async (req, res, next) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
controller.deleteReservation = async (req, res, next) => {
  try {
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.cancelReservataion = async (req, res, next) => {
  try {
    let reservation = await reservationModel.findOneAndUpdate(
      { _id: req.params.reservationId },
      {
        $set: { isCancelled: true },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: reservation });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
module.exports = controller;
