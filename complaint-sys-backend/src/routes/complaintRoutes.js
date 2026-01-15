const express = require('express');
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  deleteBulkComplaints,
} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');


const router = express.Router();

// Wrapper to catch async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.post('/', upload.array('images', 3), asyncHandler(createComplaint));

// Protected routes
router.get('/', authMiddleware, asyncHandler(getAllComplaints));
router.get('/:id', authMiddleware, asyncHandler(getComplaintById));
router.put('/:id', authMiddleware, asyncHandler(updateComplaintStatus));
router.delete('/:id', authMiddleware, asyncHandler(deleteComplaint));
router.post('/bulk-delete', authMiddleware, asyncHandler(deleteBulkComplaints));

module.exports = router;
