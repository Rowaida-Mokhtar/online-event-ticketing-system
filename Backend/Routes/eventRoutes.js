//task 2
const express = require('express');
const eventController = require('../Controllers/eventController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('', authMiddleware.authenticate, authMiddleware.authorize(['Organizer']), eventController.createEvent);
router.get('', eventController.getApprovedEvents);
router.get('/all',authMiddleware.authenticate, authMiddleware.authorize(['Admin']), eventController.getAllEvents); 
router.get('/:id', eventController.getEventById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), eventController.updateEvent);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['Organizer', 'Admin']), eventController.deleteEvent);

module.exports = router;