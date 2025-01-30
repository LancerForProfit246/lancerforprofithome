const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");





const register = async (req, res) => {
    try {
        const { username, password, userType } = req.body;
        const user = new User({ username, password, userType });
        await user.save();
        res.redirect('/users/login');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};
    //Create Login
    
    const createlogin = catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ErrorHandler("Please enter email and password", 400);
            }

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                throw new ErrorHandler("Invalid credentials", 401);
            }

            const isPasswordMatched = await user.comparePassword(password);

            if (!isPasswordMatched) {
                throw new ErrorHandler("Invalid credentials", 401);
            }

            sendToken(user, 200, res);

            switch (req.session.userType) {
                case 'customer':
                    res.render('customerDashboard');
                    break;
                case 'business':
                    res.render('businessDashboard');
                    break;
                case 'admin':
                    res.render('adminDashboard');
                    break;
                default:
                    res.redirect('/users/login');
                    break;
            }



        } catch (err) {
            next(err);
        }
    });

    
    //Read Login
// const readlogin = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         let logindata;

//         if (id) {
//             logindata = await User.findById(id);
//         } else {
//             logindata = await User.find({});
//         }

//         res.status(200).json({
//             success: true,
//             logindata
//         });
//     } catch (err) {
//         next(err);
//     }
// });

const updatelogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password, ...rest } = req.body;
    const filter = { email };
    const update = { $set: rest };
    const options = { new: true, runValidators: true };

    const updatedUser = await User.findOneAndUpdate(filter, update, options);

    if (!updatedUser) {
        return next(new ErrorHandler("Invalid", 401));
    }

    res.status(201).json({ updatedUser });
});


const deletelogin = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const filter = { email };

    const deletedUser = await User.findOneAndDelete(filter);

    if (!deletedUser) {
        return next(new ErrorHandler("Invalid", 401));
    }

    res.status(200).json({ message: "User deleted successfully" });
});

    const protectedRoute = (req, res) => {
        res.status(200).json({ message: 'This is a protected route' });
      };