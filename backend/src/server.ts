import express from 'express';
import cors from 'cors';
import router from '@infrastructure/routes/router';

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use(router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = () => {
  console.log('Shutting down gracefully...');
  process.exit(1);
};

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown();
});