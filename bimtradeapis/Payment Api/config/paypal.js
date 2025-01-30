const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.SandboxEnvironment(
    "YOUR_CLIENT_ID", // Replace with your PayPal client ID
    "YOUR_CLIENT_SECRET" // Replace with your PayPal client secret
);

const payPalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = { payPalClient };
