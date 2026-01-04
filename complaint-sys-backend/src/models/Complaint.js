const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Complaint / Number change',
      'Email change / activation',
      'Programme change not showing (SIP)',
      'Courses not showing / missing in SIP',
      "Can't login to SIP portal",
      'Reset password (SIP)',
      'Reset password (Student Email)',
      'Fees / Payment issues',
      'Results not showing',
      'Lecturer / Academic issue',
      'Hostel / Accommodation',
      'Other'
    ],
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Closed'],
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);
