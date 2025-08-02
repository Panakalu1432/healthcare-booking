const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  name: String,
  email: String,
  datetime: Date,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
