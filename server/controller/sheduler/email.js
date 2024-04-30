const cron = require('node-cron');
const nodemailer = require('nodemailer');


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
  const sendEmail = (transporter, userEmail) => {

    let mailOptions = {
      from: 'alternatedotme@gmail.com',
      to: `${userEmail}`,
      subject: 'Email from Node-App: A Test Message!',
      text: 'Some content to send',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response); 
        }
    });
};

const scheduleEmailsDemo = () => {
  const currentTime = new Date();
  const oneMinuteAfter = new Date(currentTime.getTime() + 1 * 60000); // 1 minute after current time
  const twoMinutesAfter = new Date(currentTime.getTime() + 2 * 60000); // 2 minutes after current time
  const threeMinutesAfter = new Date(currentTime.getTime() + 3 * 60000); // 3 minutes after current time

  const sendEmail = (transporter) => {
    let mailOptions = {
      from: 'alternatedotme@gmail.com',
      to: 'impriyanshu.garg@gmail.com',
      subject: 'sheduling mail check',
      text: 'Email from Sales funnel your next meeting reminder Priyanshu',
    };  


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response); 
        }
    });
};
  console.log('Started schedule emails');
  cron.schedule(oneMinuteAfter.getMinutes() + ' ' + oneMinuteAfter.getHours() + ' * * *', () => { // Send email 1 minute after the current time
    console.log('first');
    sendEmail(transporter);
  });
  
  cron.schedule(twoMinutesAfter.getMinutes() + ' ' + twoMinutesAfter.getHours() + ' * * *', () => { // Send email 2 minutes after the current time
    console.log('SECOND');
    sendEmail(transporter);
  });
  
  cron.schedule(threeMinutesAfter.getMinutes() + ' ' + threeMinutesAfter.getHours() + ' * * *', () => { // Send email 3 minutes after the current time
    console.log('third');
    sendEmail(transporter);
});
};
const scheduleEmails = (Time) => {
  const currentTime = new Date(Time); // Given date and time
  const oneDayBefore = new Date(currentTime.getTime() - 1 * 24 * 60 * 60 * 1000); // One day before
  const twoDaysBefore = new Date(currentTime.getTime() - 2 * 24 * 60 * 60 * 1000); // Two days before
  const threeDaysBefore = new Date(currentTime.getTime() - 3 * 24 * 60 * 60 * 1000); // Three days before
  const oneHourBefore = new Date(currentTime.getTime() - 1 * 60 * 60 * 1000); // One hour before
  
  console.log('Started schedule emails');
console.log('Current Time: ' + currentTime.toLocaleDateString('en-IN') + ' ' + currentTime.toLocaleTimeString('en-IN'));
console.log('One Day Before: ' + oneDayBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
console.log('Two Days Before: ' + twoDaysBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
console.log('Three Days Before: ' + threeDaysBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
console.log('One Hour Before: ' + (currentTime.getDate() === oneHourBefore.getDate() ? oneHourBefore.toLocaleTimeString('en-IN') : '10:00 AM'));
  // Schedule email 3 days before at 10:00 AM if it's in the future
  if (threeDaysBefore.getTime() > currentTime.getTime()) {
      cron.schedule('0 10 ' + threeDaysBefore.getDate() + ' ' + (threeDaysBefore.getMonth() + 1) + ' *', () => {
          console.log('Email scheduled for 3 days before');
          sendEmail(transporter);
      });
  }

  // Schedule email 2 days before at 10:00 AM if it's in the future
  if (twoDaysBefore.getTime() > currentTime.getTime()) {
      cron.schedule('0 10 ' + twoDaysBefore.getDate() + ' ' + (twoDaysBefore.getMonth() + 1) + ' *', () => {
          console.log('Email scheduled for 2 days before');
          sendEmail(transporter);
      });
  }

  // Schedule email 1 day before at 10:00 AM if it's in the future
  if (oneDayBefore.getTime() > currentTime.getTime()) {
      cron.schedule('0 10 ' + oneDayBefore.getDate() + ' ' + (oneDayBefore.getMonth() + 1) + ' *', () => {
          console.log('Email scheduled for 1 day before');
          sendEmail(transporter);
      });
  }
    // Schedule email 1 hour before if it's in the future
    if (oneHourBefore.getTime() > currentTime.getTime()) {
      cron.schedule(`${oneHourBefore.getMinutes()} ${oneHourBefore.getHours()} ${oneHourBefore.getDate()} ${oneHourBefore.getMonth() + 1} *`, () => {
          console.log('Email scheduled for one hour before');
          sendEmail(transporter);
      });
    }
};



module.exports = {scheduleEmails, scheduleEmailsDemo};
// "2024-04-29T19:20"
