const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');
const { validateRequest } = require('../middleware/validationMiddleware');
const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);

module.exports = router;
