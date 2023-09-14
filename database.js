const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoURL=process.env.mongoDbkeys;

// const mongoURL = 'mongodb://localhost:27017/your-database-name';

let dbInstance;

async function connectToDatabase() {
  if (!dbInstance) {
    const client = new MongoClient(mongoURL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      ignoreUndefined: true
    });

    try {
      await client.connect();
      dbInstance = client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  return dbInstance;
}

module.exports = { connectToDatabase };
