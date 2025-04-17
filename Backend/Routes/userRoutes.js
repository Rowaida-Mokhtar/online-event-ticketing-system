const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { authenticate, authorize } = require('../Middleware/authMiddleware');

router.get('/', authenticate, authorize('admin'), userController.getAllUsers);
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.get('/bookings', authenticate, authorize('user'), userController.getUserBookings);
router.get('/events', authenticate, authorize('organizer'), userController.getOrganizerEvents);
router.get('/events/analytics', authenticate, authorize('organizer'), userController.getEventsAnalytics);

router.get('/:id', authenticate, authorize('admin'), userController.getUserById);
router.put('/:id', authenticate, authorize('admin'), userController.updateUserRole);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;
