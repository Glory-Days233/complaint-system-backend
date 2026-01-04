const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Wrapper to catch async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

module.exports = router;
