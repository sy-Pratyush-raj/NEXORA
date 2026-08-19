import mongoose from 'mongoose';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';
import { logger } from '../utils/logger';

let mongodProcess: ChildProcess | null = null;

export const connectDatabase = async (): Promise<string> => {
  const defaultUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexora';

  // 1. Try connecting to specified URI first
  try {
    await mongoose.connect(defaultUri, {
      serverSelectionTimeoutMS: 2000,
    });
    logger.success(`Connected to MongoDB instance at: ${defaultUri.split('@').pop()}`);
    return defaultUri;
  } catch (error: any) {
    logger.warn(`Could not connect to external MongoDB on 27017 (${error.message}).`);
  }

  // 2. Start embedded standalone mongod with --nounixsocket in workspace .data/db directory
  const dbDir = path.resolve(process.cwd(), '../.data/db');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const embeddedPort = 27018;
  const embeddedUri = `mongodb://127.0.0.1:${embeddedPort}/nexora`;

  logger.info(`Starting Embedded MongoDB Engine on port ${embeddedPort}...`);

  return new Promise((resolve, reject) => {
    try {
      mongodProcess = spawn('/opt/homebrew/bin/mongod', [
        '--dbpath',
        dbDir,
        '--port',
        embeddedPort.toString(),
        '--nounixsocket',
        '--bind_ip',
        '127.0.0.1',
      ]);

      mongodProcess.on('error', (err) => {
        logger.error(`Embedded mongod spawn error: ${err.message}`);
      });

      // Wait 1.5 seconds for mongod to initialize, then connect Mongoose
      setTimeout(async () => {
        try {
          await mongoose.connect(embeddedUri, {
            serverSelectionTimeoutMS: 3000,
          });
          logger.success(`Connected to Embedded MongoDB Engine at ${embeddedUri}`);
          resolve(embeddedUri);
        } catch (connErr: any) {
          logger.error(`Failed to connect to embedded mongod: ${connErr.message}`);
          reject(connErr);
        }
      }, 1500);
    } catch (err: any) {
      logger.error(`Failed to spawn embedded mongod: ${err.message}`);
      reject(err);
    }
  });
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    if (mongodProcess) {
      mongodProcess.kill();
      mongodProcess = null;
    }
    logger.info('MongoDB disconnected gracefully.');
  } catch (err: any) {
    logger.error(`Error disconnecting MongoDB: ${err.message}`);
  }
};
