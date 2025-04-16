const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  getUserById, 
  updateUserRole, 
  deleteUser, 
  getProfile, 
  updateProfile, 
  getUserBookings, 
  getOrganizerEvents,
  getEventsAnalytics
} = require('../Controllers/userController');
const { authenticate, authorize } = require('../Middleware/authMiddleware');

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/bookings', authenticate, authorize('user'), getUserBookings);
router.get('/events', authenticate, authorize('organizer'), getOrganizerEvents);
router.get('/events/analytics', authenticate, authorize('organizer'), getEventsAnalytics);

router.get('/:id', authenticate, authorize('admin'), getUserById);
router.put('/:id', authenticate, authorize('admin'), updateUserRole);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

module.exports = router;
