//task 2
const express = require('express');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../Controllers/eventController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/events', authMiddleware.authenticate, authMiddleware.authorize(['Organizer']), createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), updateEvent);
router.delete('/events/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), deleteEvent);

module.exports = router;