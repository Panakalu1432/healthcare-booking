const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");


router.post("/update", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to save appointment." });
  }
});


router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments." });
  }
});



router.get("/doctor/:doctorName", async (req, res) => {
  try {
    const doctorName = decodeURIComponent(req.params.doctorName);
    const appointments = await Appointment.find({ doctor: doctorName });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctor appointments" });
  }
});


module.exports = router;
