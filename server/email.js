const nodemailer = require('nodemailer');
let mailOptions = {
    from: 'alternatedotme@gmail.com',
    to: 'siddhartha.marko.3@gmail.com',
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send',
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abhishekdoaguru@gmail.com',
      pass: 'onmkmsfelvgnfnoa',
    },
    tls: {
        rejectUnauthorized: false,
      },
  });


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });
