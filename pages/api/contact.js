
export default async (req, res) => {
  require('dotenv').config()

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'vannitubailusaks@gmail.com',
      pass: process.env.PASSWORD,
    },
    secure: true,
  })


  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

  const mailData = {
    from: 'vannitubailusaks@gmail.com',
    to: 'kaidolink333@gmail.com',
    replyTo: req.body.email,
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Saadetud isikult: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }
 
  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log(info);
            resolve(info);
        }
    });
});

  res.status(200).end()
}