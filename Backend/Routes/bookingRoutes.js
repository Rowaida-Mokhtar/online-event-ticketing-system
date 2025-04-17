//task 2
const express = require('express');
const bookingController = require('../Controllers/bookingController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/bookings', authMiddleware.authenticate, bookingController.bookTickets);
router.get('/bookings', authMiddleware.authenticate, bookingController.getBookings);
router.get('/bookings/:id', authMiddleware.authenticate, bookingController.getBookingById);
router.delete('/bookings/:id', authMiddleware.authenticate, bookingController.cancelBooking);


module.exports = router;