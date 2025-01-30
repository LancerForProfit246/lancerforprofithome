var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

// Set the server port
app.set('port', port);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., your HTML form)
app.use(express.static(path.join(__dirname, "form.html")));


app.get("/", function (req, response) {
    response.sendFile(path.join(__dirname, "form.html"));
});

// Email sending route
app.post("/send_email", function (req, response) {
    var from = req.body.from;
    // var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lancerforprofit246@gmail.com',
            pass: 'xqly jwep xtcj aego'
        }
    });

    var mailOptions = {
        from: from,
        to: 'lancerforprofit246@gmail.com',
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email Sent: " + info.response);
        }
        response.redirect("/");
    });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
