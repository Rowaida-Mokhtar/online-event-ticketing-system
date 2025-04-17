//task 2
const express = require('express');
const eventController = require('../Controllers/eventController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['Organizer']), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), eventController.updateEvent);
router.delete('/events/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), eventController.deleteEvent);

module.exports = router;