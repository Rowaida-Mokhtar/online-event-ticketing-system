const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Create new event - default status: pending
const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category, image, ticketPrice, totalTickets } = req.body;
    if (!title || !description || !date || !location || !category || ticketPrice == null || totalTickets == null) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    const organizer = req.user._id;
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      image,
      ticketPrice,
      totalTickets,
      remainingTickets: totalTickets, 
      organizer,
      status: 'pending', // all new events need admin approval
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created and pending approval', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get only approved events (public route)
const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' });
    if (events.length === 0) {
      return res.status(404).json({ message: 'No Approved events found' });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllEvents = async (req, res) => {
  console.log("Admin request received by /events/all");
  // continue...

  try {
    const events = await Event.find({});
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.status !== 'approved') {
      return res.status(403).json({ message: 'Event is not approved' });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const isAdmin = req.user.role === 'admin';
    
    const updates = { ...req.body };
    if (!isAdmin && 'status' in updates) {
      return res.status(403).json({ message: 'Only admin can update the status of an event' });
    }
    if ('totalTickets' in updates && updates.totalTickets < (event.totalTickets - event.remainingTickets)) {
      return res.status(400).json({
        message: 'Cannot reduce total tickets below number already booked'
      });
    }
    if ('ticketPrice' in updates && updates.ticketPrice < 0) {
      return res.status(400).json({ message: 'Ticket price cannot be negative' });
    }

    if ('totalTickets' in updates && updates.totalTickets < 1) {
      return res.status(400).json({ message: 'Total tickets must be at least 1' });
    }

    if ('remainingTickets' in updates && updates.remainingTickets < 0) {
      return res.status(400).json({ message: 'Remaining tickets cannot be negative' });
    }
    Object.assign(event, updates);
    await event.save();
    res.json({ message: 'Event updated successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete event (organizer or admin only)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await Booking.updateMany(
      { event: req.params.id, status: { $ne: 'canceled' } },
      { $set: { status: 'canceled' } }
    );

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  createEvent,
  getApprovedEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
