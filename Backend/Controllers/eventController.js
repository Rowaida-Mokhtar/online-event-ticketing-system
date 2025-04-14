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