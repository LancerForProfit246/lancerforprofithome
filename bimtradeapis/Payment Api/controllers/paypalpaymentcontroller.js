const Payment = require("../models/PaypalPayment");
const { payPalClient } = require("../config/paypal");
const paypal = require("@paypal/checkout-server-sdk");

// Create PayPal Payment
const createPayPalOrder = async (amount, currency = "USD") => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: amount
            }
        }]
    });

    try {
        const order = await payPalClient.execute(request);
        return order.result;
    } catch (error) {
        throw error;
    }
};

// Capture PayPal Payment
const capturePayPalOrder = async (orderId) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await payPalClient.execute(request);
        return capture.result;
    } catch (error) {
        throw error;
    }
};

// Create Payment
const createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const payPalOrder = await createPayPalOrder(amount, currency);
        const paymentData = {
            paymentId: payPalOrder.id,
            orderId: payPalOrder.id,
            amount: amount,
            currency: currency,
            status: payPalOrder.status
        };
        const payment = new Payment(paymentData);
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read Payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findOne({ paymentId: req.params.paymentId });
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read All Payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Payment
const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findOneAndUpdate({ paymentId: req.params.paymentId }, req.body, { new: true });
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Payment
const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findOneAndDelete({ paymentId: req.params.paymentId });
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment,
    capturePayPalOrder
};
