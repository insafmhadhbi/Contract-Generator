import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change to your email service provider if not using Gmail
      auth: {
        user: process.env.SMTP_EMAIL, // Use the email address specified in your environment variables
        pass: process.env.SMTP_PASSWORD, // Use the password specified in your environment variables
      },
    });

    // Define email message options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL, // Use the from email specified in your environment variables
      to: email,
      subject: subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(`Error sending email: ${error.message}`);
  }
};

export default sendEmail;
