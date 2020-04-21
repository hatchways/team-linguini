const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = async (message) => {
  try {
    await sgMail.send(message);
  } catch {
    (error) => console.log(error);
  }
};

const sendWelcomeEmail = async (to) => {
  console.log('Email Sent')
  await send({
    to,
    from: process.env.FROM_EMAIL,
    subject: "Welcome to Kanban Boards",
    text:
      "Thank you for registering on the kanban boards application. We welcome you to our community and look forward to seeing you around.",
  });
};

module.exports = sendWelcomeEmail;
