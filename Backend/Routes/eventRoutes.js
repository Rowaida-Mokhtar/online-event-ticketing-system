//task 2
const express = require('express');
const eventController = require('../Controllers/eventController');
const authMiddleware = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('', authMiddleware.authenticate, authMiddleware.authorize(['organizer']), eventController.createEvent);
router.get('', eventController.getApprovedEvents);
router.get('/all',authMiddleware.authenticate, authMiddleware.authorize(['admin']), eventController.getAllEvents); 
router.get('/:id', eventController.getEventById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['organizer', 'admin']), eventController.updateEvent);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['organizer', 'admin']), eventController.deleteEvent);

module.exports = router;