const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resetAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected');

    const Admin = require('./src/models/Admin');

    // Delete existing admin by username
    console.log('Deleting existing admin account...');
    const result = await Admin.deleteOne({ username: 'admin' });
    console.log(`Deleted ${result.deletedCount} existing admin(s)`);

    // Hash password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('gctu2025', salt);

    // Create admin
    console.log('Creating new admin account...');
    const admin = new Admin({
      username: 'admin',
      email: 'admin@gctu.edu.gh',
      password: hashedPassword,
    });

    await admin.save();
    console.log('\n✓ Admin account created successfully!');
    console.log('  Email: admin@gctu.edu.gh');
    console.log('  Password: gctu2025');
    console.log('\nYou can now login with these credentials.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
