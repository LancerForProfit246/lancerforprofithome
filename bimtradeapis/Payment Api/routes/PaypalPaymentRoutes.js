const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paypalpaymentcontroller");

router.post("/payments", paymentController.createPayment);
router.get("/payments/:paymentId", paymentController.getPaymentById);
router.get("/payments", paymentController.getAllPayments);
router.put("/payments/:paymentId", paymentController.updatePayment);
router.delete("/payments/:paymentId", paymentController.deletePayment);

module.exports = router;
