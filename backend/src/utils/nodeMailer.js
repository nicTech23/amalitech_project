
const nodemailer = require("nodemailer")
const hbs = require('nodemailer-express-handlebars');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nictech23@gmail.com",
        pass: "mnpq zmlx vpyx uoux",
    },
});

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: './views/', // directory where your HBS files are located
        layoutsDir: './views/',  // directory where your layout HBS files are located
        defaultLayout: ''              // name of main layout file (without .hbs extension)
    },
    viewPath: './views/',        // directory where your HBS files are located
    extName: '.hbs'
}));

const NodeMailer = (email, subject, attachments = [], first_name, url, template, body)=> {
    const mailOptions = {
        from:process.env.EMAIL,
        to: email,
        subject,
        attachments,
        html:body,
        template, // Name of your HBS file (without .hbs extension)
        context: {
            // Data to pass to your HBS template
            first_name,
            url
            // Other variables you want to use in your HBS template
        }
    };

    return transporter.sendMail(mailOptions)
        .then((res) => {
            console.log(res.response);
        })
        .catch((err) => {
            console.log(err.message);
            throw new Error(err.message);
        });
};

module.exports = NodeMailer