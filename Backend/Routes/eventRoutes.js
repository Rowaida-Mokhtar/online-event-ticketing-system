//task 2
const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/events', authenticate, authorize(['Organizer']), createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', authenticate, authorize(['Organizer', 'Admin']), updateEvent);
router.delete('/events/:id', authenticate, authorize(['Organizer', 'Admin']), deleteEvent);

module.exports = router;