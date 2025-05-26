const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Book tickets for an event
const bookTickets = async (req, res) => {
  try {
    const { eventId, numberOfTickets } = req.body;
    const user = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status !== 'approved') {
      return res.status(403).json({ message: 'Event is not approved for booking' });
    }

    if (event.remainingTickets < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const totalPrice = numberOfTickets * event.ticketPrice;

    const newBooking = new Booking({
      user,
      event: eventId,
      numberOfTickets,
      totalPrice,
      status: 'confirmed', // assume confirmed on success
    });

    await newBooking.save();

    event.remainingTickets -= numberOfTickets;
    await event.save();

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get booking details by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event user');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to this booking' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }    
    if (booking.status === 'canceled') {
      return res.status(400).json({ message: 'Booking is already canceled' });
    }

    // Restore event tickets
    const event = await Event.findById(booking.event);
    if (event) {
      event.remainingTickets += booking.numberOfTickets;
      await event.save();
    }

    // Update booking status
    booking.status = 'canceled';
    await booking.save();

    res.json({ message: 'Booking canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  bookTickets,
  getBookingById,
  cancelBooking
};
