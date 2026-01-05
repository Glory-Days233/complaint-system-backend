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
        host: (process.env.SMTP_HOST || 'smtp.gmail.com').trim(),
        port: parseInt((process.env.SMTP_PORT || '587').trim()),
        secure: false, // true for 465, false for other ports
        auth: {
            user: (process.env.SMTP_EMAIL || '').trim(),
            pass: (process.env.SMTP_PASSWORD || '').trim()
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000
    });

    // Verify connection configuration
    console.log('Verifying SMTP Connection...');
    try {
        await transporter.verify();
        console.log('SMTP Connection Established Successfully');
    } catch (verifyError) {
        console.error('SMTP Connection FAILED:', verifyError);
        return; // Stop if we can't connect
    }

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
    }
};

module.exports = sendEmail;
