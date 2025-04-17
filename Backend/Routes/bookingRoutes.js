//task 2
const express = require('express');
const bookingController = require('../Controllers/bookingController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, bookingController.bookTickets);
router.get('/users', authMiddleware.authenticate, bookingController.getBookings);
router.get('/:id', authMiddleware.authenticate, bookingController.getBookingById);
router.delete('/:id', authMiddleware.authenticate, bookingController.cancelBooking);


module.exports = router;