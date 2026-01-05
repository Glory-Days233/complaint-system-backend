const Complaint = require('../models/Complaint');
const sendEmail = require('../utils/sendEmail');

// Create complaint
const createComplaint = async (req, res) => {
  try {
    // Log incoming request for debugging malformed requests from the frontend
    console.log('Incoming /api/complaints request headers:', req.headers);
    console.log('Incoming /api/complaints request body:', req.body);
    const { name, email, phone, category, subject, description } = req.body;

    if (!name || !email || !phone || !category || !subject || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const complaint = new Complaint({
      name,
      email,
      phone,
      category,
      subject,
      description,
    });

    await complaint.save();

    // Send Confirmation Email
    try {
      await sendEmail({
        email: email,
        subject: 'Complaint Received - GCTU Support',
        message: `
                <h1>Complaint Received</h1>
                <p>Dear ${name},</p>
                <p>We have received your complaint regarding <strong>${subject}</strong>.</p>
                <p><strong>Complaint ID:</strong> ${complaint._id}</p>
                <p>Our team will look into it and get back to you shortly.</p>
                <p>Best regards,<br>GCTU Support Team</p>
            `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // We continue intentionally, as the transaction was successful
    }

    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single complaint
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, priority, updatedAt: Date.now() },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json({ message: 'Complaint updated successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Bulk delete complaints
const deleteBulkComplaints = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of IDs' });
    }

    const result = await Complaint.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Complaints deleted successfully', count: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  deleteBulkComplaints,
};
