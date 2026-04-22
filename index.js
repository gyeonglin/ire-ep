require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;
const PORT = process.env.PORT || 3000;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    fastify.log.info(`MongoDB connected to database: ${MONGODB_DB}`);
  } catch (err) {
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

fastify.get('/', async () => {
  return 'OK';
});

fastify.get('/health', async () => {
  const dbState = mongoose.connection.readyState;
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  return {
    status: 'ok',
    database: states[dbState] || 'unknown',
  };
});

async function start() {
  await connectDB();

  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
