
const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
    const { amount, paymentMethod } = req.body;
    const transactionId = `TXN${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const payment = await Payment.create({
        user: req.user.id,
        amount,
        paymentMethod,
        transactionId,
    });

    res.json({ success: true, payment });
};

