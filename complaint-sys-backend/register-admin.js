const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected');

    const Admin = require('./src/models/Admin');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@gctu.edu.gh' });
    if (adminExists) {
      console.log('Admin already exists with email: admin@gctu.edu.gh');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Hash password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('gctu2025', salt);

    // Create admin
    console.log('Creating admin account...');
    const admin = new Admin({
      username: 'admin',
      email: 'admin@gctu.edu.gh',
      password: hashedPassword,
    });

    await admin.save();
    console.log('✓ Admin registered successfully!');
    console.log('  Email: admin@gctu.edu.gh');
    console.log('  Password: gctu2025');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

registerAdmin();
