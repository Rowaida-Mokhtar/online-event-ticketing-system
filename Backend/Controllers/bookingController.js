//task 2
const Booking = require('../models/Booking');
const Event = require('../models/Event');

const bookTickets = async (req, res) => {
  const { eventId, numberOfTickets } = req.body;
  const user = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  if (event.remainingTickets < numberOfTickets) {
    return res.status(400).json({ message: 'Not enough tickets available' });
  }

  const totalPrice = numberOfTickets * event.ticketPrice;
  const newBooking = new Booking({ user, event: eventId, numberOfTickets, totalPrice });
  await newBooking.save();

  event.remainingTickets -= numberOfTickets;
  await event.save();

  res.status(201).json(newBooking);
};



const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
};

const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const event = await Event.findById(booking.event);
  event.remainingTickets += booking.numberOfTickets;
  await event.save();

  res.json({ message: 'Booking canceled successfully' });
};

module.exports = { bookTickets, getBookingById, cancelBooking }; 