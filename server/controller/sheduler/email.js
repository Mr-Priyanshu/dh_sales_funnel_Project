const cron = require('node-cron');
const nodemailer = require('nodemailer');
const saveHere = {};

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
  const sendEmail = (transporter, userEmail, clientName, meetTime, meetDate) => {

    let mailOptions = {
      from: 'alternatedotme@gmail.com',
      to: `${userEmail}`,
      subject: `Reminder: Scheduled Meeting with ${clientName}`,
      text: `I hope this email finds you well. This is just a gentle reminder regarding your scheduled meeting with ${clientName} on ${meetDate} at ${meetTime}.

      Agenda:
      Crack This Deal 
      
      Please ensure you are well-prepared for the meeting and have ready all necessary materials/documents. If you have any questions or need assistance before the meeting, feel free to contact me.
      
      Best regards,
      DOAGuru Infotech
      Sales Team `,
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email sending failed:', error);
        } else {
            console.log('Email sent:', info.response); 
        }
    });
};

const scheduleEmails = (dateAndTime, userEmail, userId, clientName ) => {
  // meetTime, meetDate
  const currentTime = new Date(dateAndTime); // Given date and time
  
  const [meetDate, meetTime] = dateAndTime.split('T');

  const oneWeekBefore = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000); // One week before
  const oneDayBefore = new Date(currentTime.getTime() - 1 * 24 * 60 * 60 * 1000); // One day before
  const oneHourBefore = new Date(currentTime.getTime() - 1 * 60 * 60 * 1000); // One hour before
  const halfHourBefore = new Date(currentTime.getTime() - 0.5 * 60 * 60 * 1000); // Half an hour before
  
console.log('Started schedule emails');
/**
 * console.log('Started schedule emails');
 * console.log('Current Time: ' + currentTime.toLocaleDateString('en-IN') + ' ' + currentTime.toLocaleTimeString('en-IN'));
 * console.log('One Week Before: ' + oneWeekBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
 * console.log('One Day Before: ' + oneDayBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
 * console.log('One Hour Before: ' + (currentTime.getDate() === oneHourBefore.getDate() ? oneHourBefore.toLocaleTimeString('en-IN') : '10:00 AM'));
 * console.log('Half Hour Before: ' + (currentTime.getDate() === halfHourBefore.getDate() ? halfHourBefore.toLocaleTimeString('en-IN') : '9:30 AM'));
 */


  // Schedule email 3 days before at 10:00 AM if it's in the future
  // console.log(transporter, email);
  sendEmail(transporter, userEmail, clientName, meetTime, meetDate, userId);
  let taskId = '';
  const removeids = [`task-${userId}fourth`, `task-${userId}third`, `task-${userId}second`, `task-${userId}one`];

  for (let taskId of removeids) {
    if (saveHere[taskId]) {
      saveHere[taskId].stop();
        delete saveHere[taskId];
    }
}
  
  if (oneWeekBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}fourth`;
    saveHere[taskId] =  cron.schedule('0 10 ' + threeDaysBefore.getDate() + ' ' + (threeDaysBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 3 days before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate, userId);
    });
  }
  
  // Schedule email 2 days before at 10:00 AM if it's in the future
  if (oneDayBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}third`;
    saveHere[taskId] = cron.schedule('0 10 ' + oneDayBefore.getDate() + ' ' + (oneDayBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 2 days before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
    });
  }
  
  // Schedule email 1 day before at 10:00 AM if it's in the future
  if (oneHourBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}second`;
    saveHere[taskId] =  cron.schedule('0 10 ' + oneHourBefore.getDate() + ' ' + (oneHourBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 1 day before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
    });
  }
  // Schedule email 1 hour before if it's in the future
  if (halfHourBefore.getTime() > currentTime.getTime()) {
      taskId = `task-${userId}one`;
      saveHere[taskId] = cron.schedule(`${halfHourBefore.getMinutes()} ${halfHourBefore.getHours()} ${halfHourBefore.getDate()} ${halfHourBefore.getMonth() + 1} *`, () => {
          console.log('Email scheduled for one hour before');
          sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
      });
    }
};

const scheduleEmailsFinalDemo = (dateAndTime, userEmail, userId, clientName ) => {
  // meetTime, meetDate
  const targetTime = new Date(dateAndTime); // Given date and time
  const currentTime = new Date();
  
  const [meetDate, meetTime] = dateAndTime.split('T');

  const oneWeekBefore = new Date(targetTime.getTime() - 7 * 24 * 60 * 60 * 1000); // One week before
  const oneDayBefore = new Date(targetTime.getTime() - 1 * 24 * 60 * 60 * 1000); // One day before
  const oneHourBefore = new Date(targetTime.getTime() - 1 * 60 * 60 * 1000); // One hour before
  const halfHourBefore = new Date(targetTime.getTime() - 0.5 * 60 * 60 * 1000); // Half an hour before
  
console.log('Started schedule emails');

  console.log('Started schedule emails');
  console.log('Current Time: ' + targetTime.toLocaleDateString('en-IN') + ' ' + currentTime.toLocaleTimeString('en-IN'));
  console.log('One Week Before: ' + oneWeekBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
  console.log('One Day Before: ' + oneDayBefore.toLocaleDateString('en-IN') + ' 10:00 AM');
  console.log('One Hour Before: ' + (targetTime.getDate() === oneHourBefore.getDate() ? oneHourBefore.toLocaleTimeString('en-IN') : '10:00 AM'));
  console.log('Half Hour Before: ' + (targetTime.getDate() === halfHourBefore.getDate() ? halfHourBefore.toLocaleTimeString('en-IN') : '9:30 AM'));

  sendEmail(transporter, userEmail, clientName, meetTime, meetDate, userId);
  let taskId = '';
  const removeids = [`task-${userId}fourth`, `task-${userId}third`, `task-${userId}second`, `task-${userId}one`];

  for (let taskId of removeids) {
    if (saveHere[taskId]) {
      saveHere[taskId].stop();
        delete saveHere[taskId];
    }
}

  // if (oneWeekBefore.getTime() > currentTime.getTime()) {
  if (oneWeekBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}fourth`;
    console.log('One Week Before: ' + oneWeekBefore.toLocaleDateString('en-IN') + ' 17:29 AM');

    saveHere[taskId] =  cron.schedule('0 10 ' + oneWeekBefore.getDate() + ' ' + (oneWeekBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 7 days before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate, userId);
    });
  }
  
  // Schedule email 1 days before at 10:00 AM if it's in the future
  if (oneDayBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}third`;
    saveHere[taskId] = cron.schedule('0 10 ' + oneDayBefore.getDate() + ' ' + (oneDayBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 1 days before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
    });
  }
  
  // Schedule email 1 hour before at 10:00 AM if it's in the future
  if (oneHourBefore.getTime() > currentTime.getTime()) {
    taskId = `task-${userId}second`;
    saveHere[taskId] = cron.schedule('0 ' + (oneHourBefore.getHours() - 1) + ' ' + oneHourBefore.getDate() + ' ' + (oneHourBefore.getMonth() + 1) + ' *', () => {
      console.log('Email scheduled for 1 hour before');
      sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
  });
  }
  // Schedule email half hour before if it's in the future
  if (halfHourBefore.getTime() > currentTime.getTime()) {
      taskId = `task-${userId}one`;
      saveHere[taskId] = cron.schedule('30 ' + (halfHourBefore.getHours() - 1) + ' ' + halfHourBefore.getDate() + ' ' + (halfHourBefore.getMonth() + 1) + ' *', () => {
        console.log('Email scheduled for half an hour before');
        sendEmail(transporter, userEmail, clientName, meetTime, meetDate);
    });
    }
};




















// ---------------------------------------
// Demo Line

const scheduleEmailsDemo = (email) => {
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
module.exports = {scheduleEmails, scheduleEmailsDemo, scheduleEmailsFinalDemo};
// "2024-04-29T19:20"








