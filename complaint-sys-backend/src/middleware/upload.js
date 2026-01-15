const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'complaints', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

// Initialize Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
