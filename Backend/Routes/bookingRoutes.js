const express = require('express');
const bookingController = require('../Controllers/bookingController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('', authMiddleware.authenticate, bookingController.bookTickets);//make sure its not only users
router.get('/:id', authMiddleware.authenticate, bookingController.getBookingById);
router.delete('/:id', authMiddleware.authenticate, bookingController.cancelBooking);


module.exports = router;