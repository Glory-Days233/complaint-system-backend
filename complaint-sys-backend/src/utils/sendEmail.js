const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Debug logs to help diagnose issues
    console.log('--- Email Service Debug ---');
    console.log('Attempting to send email too:', options.email);
    console.log('SMTP Config:', {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        user: process.env.SMTP_EMAIL ? '***PRESENT***' : 'MISSING',
        passSet: !!process.env.SMTP_PASSWORD
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Define email options
    const mailOptions = {
        from: process.env.FROM_EMAIL || process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // We don't throw here to avoid crashing the complaint creation
        // but we log it clearly
    }
};

module.exports = sendEmail;
