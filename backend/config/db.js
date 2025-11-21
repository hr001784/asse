const mongoose = require('mongoose');

let MongoMemoryServer;
let memoryServer;

const connectDB = async () => {
  const shouldUseMemory =
    process.env.USE_IN_MEMORY_DB === 'true' || !process.env.MONGO_URI;

  try {
    let uri = process.env.MONGO_URI;

    if (shouldUseMemory) {
      if (!MongoMemoryServer) {
        ({ MongoMemoryServer } = require('mongodb-memory-server'));
      }
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
      console.log('Using in-memory MongoDB instance');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

module.exports = { connectDB, disconnectDB };