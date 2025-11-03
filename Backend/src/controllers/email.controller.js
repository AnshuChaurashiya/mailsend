import nodemailer from "nodemailer";
import EmailBatch from "../models/EmailBatch.js";
import dotenv from "dotenv"
dotenv.config()
// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send bulk emails
export const sendEmails = async (req, res) => {
  try {
    const { subject, message, recipients } = req.body;
    const userId = req.user._id;

    // Validate inputs
    if (!subject || !message || !recipients) {
      return res
        .status(400)
        .json({ message: "Subject, message, and recipients are required" });
    }

    // Ensure recipients is an array
    const recipientsArray = Array.isArray(recipients)
      ? recipients
      : recipients.split(",").map((email) => email.trim());

    if (recipientsArray.length === 0) {
      return res.status(400).json({ message: "No valid recipients found" });
    }

    // Save email batch to DB (initially pending)
    const emailBatch = new EmailBatch({
      userId,
      subject,
      message,
      recipients: recipientsArray,
      status: "pending",
    });
    await emailBatch.save();

    // Send emails individually
    const sendPromises = recipientsArray.map(async (recipient) => {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: recipient,
        subject,
        text: message,
        // html: `<p>${message}</p>` // Optional if you want HTML emails
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(sendPromises);

    // Update status to sent
    emailBatch.status = "sent";
    await emailBatch.save();

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);

    // Safely mark last batch as failed
    try {
      if (req.user && req.body.subject) {
        const emailBatch = await EmailBatch.findOne({
          userId: req.user._id,
          subject: req.body.subject,
        }).sort({ createdAt: -1 });

        if (emailBatch) {
          emailBatch.status = "failed";
          await emailBatch.save();
        }
      }
    } catch (saveError) {
      console.error("Error updating batch status:", saveError);
    }

    res
      .status(500)
      .json({ success: false, error: error.message || "Internal server error" });
  }
};
