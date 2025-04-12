const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  ticketPrice: { type: Number, required: true,min:0 },
  totalTickets: { type: Number, required: true,min:1 },
  remainingTickets: { type: Number, required: true,min:0},
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps:true});

module.exports = mongoose.model('Event', eventSchema);

//task 2
const Event = require('../models/Event');
const User = require('../models/User');

const createEvent = async (req, res) => {
  const { title, description, date, location, category, image, ticketPrice, totalTickets } = req.body;
  const organizer = req.user._id;
  const newEvent = new Event({ title, description, date, location, category, image, ticketPrice, totalTickets, organizer });
  await newEvent.save();
  res.status(201).json(newEvent);
};

const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }
  res.json(event);
};