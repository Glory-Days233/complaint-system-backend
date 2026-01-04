const Complaint = require('../models/Complaint');

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

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
};
