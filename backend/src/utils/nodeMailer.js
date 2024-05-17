
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nictech23@gmail.com",
        pass: "mnpq zmlx vpyx uoux",
    },
});


const NodeMailer = (email, html, subject, attachments = [])=> {
    const mailOptions = {
        from: "nictech23@gmail.com",
        to: email,
        subject,
        html,
        attachments
    };

    return transporter.sendMail(mailOptions)
        .then((res) => {
            console.log(res.response);
        })
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
};

module.exports = NodeMailer