import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let message = {
        from: process.env.MESSAGE_FROM,
        to: process.env.MESSAGE_TO,
        subject: sub,
        text: txt,
    }

    await transporter
        .sendMail(message)
        .then(() => {
            console.log("message sent");
        })
        .catch((err) => {
            console.log("Message not sent - " + err);

        });
}


