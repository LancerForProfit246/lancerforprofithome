// createlogin.test.js

const chai = require('chai');
const sinon = require('sinon');
const express = require('express');
const User = require('../models/user'); // Adjust the path to your User model
const sendToken = require('../utils/sendToken'); // Adjust the path to your sendToken function
const ErrorHandler = require('../utils/errorHandler'); // Adjust the path to your ErrorHandler
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); // Adjust the path to your catchAsyncErrors middleware

const { expect } = chai;

const app = express();
app.use(express.json());

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

app.post('/login', createlogin);

describe('POST /login', () => {
    let findOneStub, comparePasswordStub, sendTokenStub, res;

    beforeEach(() => {
        findOneStub = sinon.stub(User, 'findOne');
        comparePasswordStub = sinon.stub(User.prototype, 'comparePassword');
        sendTokenStub = sinon.stub(sendToken, 'sendToken');

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            render: sinon.stub(),
            redirect: sinon.stub(),
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if email or password is missing', async () => {
        const req = { body: { email: '', password: '' }, session: {} };
        const next = sinon.stub();

        await createlogin(req, res, next);

        expect(next.calledOnce).to.be.true;
        const err = next.getCall(0).args[0];
        expect(err).to.be.instanceOf(ErrorHandler);
        expect(err.statusCode).to.equal(400);
        expect(err.message).to.equal("Please enter email and password");
    });

    it('should return 401 if user is not found', async () => {
        const req = { body: { email: 'test@test.com', password: 'password' }, session: {} };
        const next = sinon.stub();
        findOneStub.resolves(null);

        await createlogin(req, res, next);

        expect(next.calledOnce).to.be.true;
        const err = next.getCall(0).args[0];
        expect(err).to.be.instanceOf(ErrorHandler);
        expect(err.statusCode).to.equal(401);
        expect(err.message).to.equal("Invalid credentials");
    });

    it('should return 401 if password does not match', async () => {
        const req = { body: { email: 'test@test.com', password: 'password' }, session: {} };
        const next = sinon.stub();
        findOneStub.resolves({ comparePassword: comparePasswordStub });
        comparePasswordStub.resolves(false);

        await createlogin(req, res, next);

        expect(next.calledOnce).to.be.true;
        const err = next.getCall(0).args[0];
        expect(err).to.be.instanceOf(ErrorHandler);
        expect(err.statusCode).to.equal(401);
        expect(err.message).to.equal("Invalid credentials");
    });

    it('should call sendToken and render correct dashboard based on userType', async () => {
        const req = { body: { email: 'test@test.com', password: 'password' }, session: { userType: 'customer' } };
        const next = sinon.stub();
        const user = { comparePassword: comparePasswordStub };
        findOneStub.resolves(user);
        comparePasswordStub.resolves(true);
        sendTokenStub.resolves();

        await createlogin(req, res, next);

        expect(sendTokenStub.calledOnce).to.be.true;
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('customerDashboard')).to.be.true;
    });
});
