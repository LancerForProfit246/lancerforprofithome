const express = require("express");

const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Customer = require("./Order.js/Customer");







// Create Customer
const createCustomer = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.create(req.body);
    res.status(200).json({
        success: true,
        customer
    });
});

// Read Customer (Display)
const readCustomer = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) throw new ErrorHandler('Customer not found', 404);
    res.status(200).json({
        success: true,
        customer
    });
});

// Update Customer
const updateCustomer = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!customer) throw new ErrorHandler('Customer not found', 404);
    res.status(200).json({
        success: true,
        customer
    });
});

// Delete Customer
const deleteCustomer = catchAsyncErrors(async (req, res, next) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) throw new ErrorHandler('Customer not found', 404);
    res.status(200).json({
        success: true,
        message: 'Customer deleted successfully'
    });
});

module.exports = {
    createCustomer,
    readCustomer,
    updateCustomer,
    deleteCustomer
};

