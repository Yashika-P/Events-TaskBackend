const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
    const events = await Event.find({});
    res.json(events);
};

exports.createEvent = async (req, res) => {
    const { title, description, date, location, price } = req.body;
    const event = await Event.create({ title, description, date, location, price });
    res.status(201).json(event);
};
