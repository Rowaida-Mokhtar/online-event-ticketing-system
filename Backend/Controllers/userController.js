const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');

// @desc    Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get current user's profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update current user's profile
const updateProfile = async (req, res) => {
  const { name, email, age, profilePicture,password,role} = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (role && role !== user.role) {
      return res.status(403).json({ message: "You are not allowed to change your role" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age; 
    if (profilePicture) user.profilePicture = profilePicture;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    
    const updatedUser = await user.save();
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single user by ID (admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// @desc    Update user role (admin only)
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a user (admin only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user bookings (user only)
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    
    if (bookings.length === 0) {
      return res.status(200).json({ message: 'No bookings found for this user.' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user bookings", error: error.message });
  }
};

// @desc    Get organizer events (organizer only)
const getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id });

    if (events.length === 0) {
      return res.status(200).json({ message: 'No events found for this organizer.', events: [] });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching organizer events", error: error.message });
  }
};


// @desc    Get analytics for organizer events
const getEventsAnalytics = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id });

    if (events.length === 0) {
      return res.status(200).json({
        message: 'No events created by this organizer yet.',
        totalEvents: 0,
        totalTicketsSold: 0,
        totalRevenue: 0,
        eventStats: []
      });
    }

    let totalTicketsSold = 0;
    let totalRevenue = 0;
    let eventStats = [];

    for (const event of events) {
      const bookings = await Booking.find({ event: event._id });

      let eventTicketsSold = 0;
      let eventRevenue = 0;

      bookings.forEach(booking => {
        eventTicketsSold += booking.numberOfTickets;
        eventRevenue += booking.totalPrice;
      });

      totalTicketsSold += eventTicketsSold;
      totalRevenue += eventRevenue;

      eventStats.push({
        eventId: event._id,
        eventName: event.title,
        ticketsSold: eventTicketsSold,
        totalTickets: event.totalTickets || 0, // if your Event model includes this
      });
    }

    res.status(200).json({
      totalEvents: events.length,
      totalTicketsSold,
      totalRevenue,
      eventStats,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getProfile,
  updateProfile,
  getUserById,
  updateUserRole,
  deleteUser,
  getUserBookings,
  getOrganizerEvents,
  getEventsAnalytics,
};