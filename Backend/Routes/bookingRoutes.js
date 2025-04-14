//task 2
const express = require('express');
const { bookTickets, getBookings, getBookingById, cancelBooking } = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/bookings', authenticate, bookTickets);
router.get('/bookings', authenticate, getBookings);
router.get('/bookings/:id', authenticate, getBookingById);
router.delete('/bookings/:id', authenticate, cancelBooking);

module.exports = router;