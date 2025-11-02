import nodemailer from 'nodemailer';
import EmailBatch from '../models/EmailBatch.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
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

    if (!subject || !message || !recipients || recipients.length === 0) {
      return res.status(400).json({ message: 'Subject, message, and recipients are required' });
    }

    // Save email batch to DB
    const emailBatch = new EmailBatch({
      userId,
      subject,
      message,
      recipients,
      status: 'pending',
    });
    await emailBatch.save();

    // Send emails
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipients.join(','),
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    // Update status to sent
    emailBatch.status = 'sent';
    await emailBatch.save();

    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);

    // Update status to failed if batch exists
    if (req.body.subject) {
      const emailBatch = await EmailBatch.findOne({ userId: req.user._id, subject: req.body.subject }).sort({ createdAt: -1 });
      if (emailBatch) {
        emailBatch.status = 'failed';
        await emailBatch.save();
      }
    }

    res.status(500).json({ success: false, error: error.message });
  }
};
