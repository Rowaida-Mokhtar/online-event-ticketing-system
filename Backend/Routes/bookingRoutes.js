const express = require('express');
const bookingController = require('../Controllers/bookingController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('', authMiddleware.authenticate,authMiddleware.authorize('user'),bookingController.bookTickets);//make sure its not only users
router.get('/:id', authMiddleware.authenticate,authMiddleware.authorize('user'),bookingController.getBookingById);
router.delete('/:id', authMiddleware.authenticate,authMiddleware.authorize('user'),bookingController.cancelBooking);


module.exports = router;