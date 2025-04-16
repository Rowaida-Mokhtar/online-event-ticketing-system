//task 2
const express = require('express');
const { bookTickets, getBookings, getBookingById, cancelBooking } = require('../Controllers/bookingController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/bookings', authMiddleware.authenticate, bookTickets);
router.get('/bookings', authMiddleware.authenticate, getBookings);
router.get('/bookings/:id', authMiddleware.authenticate, getBookingById);
router.delete('/bookings/:id', authMiddleware.authenticate, cancelBooking);

module.exports = router;