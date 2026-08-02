const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const adminUser = {
      name: 'Admin User',
      email: 'admin@26i-consult.com',
      password: 'password123',
      role: 'admin',
    };

    const clientUser = {
      name: 'Test Client',
      email: 'client@example.com',
      password: 'password123',
      role: 'client',
    };

    await User.create([adminUser, clientUser]);

    console.log('Data Imported! Admin and Test Client created.');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
