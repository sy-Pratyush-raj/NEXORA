import { createApp } from './app';
import { connectDatabase } from './config/db';
import { logger } from './utils/logger';
import { User } from './models/User';
import { seedWorkspaceDataForUser } from './services/seedService';

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // 1. Connect to Database (with resilient memory fallback)
    await connectDatabase();

    // 2. Ensure initial Demo User exists for instant out-of-the-box exploration
    const demoEmail = 'alex.vance@nexora.io';
    let demoUser = await User.findOne({ email: demoEmail });
    if (!demoUser) {
      logger.info('Initializing default workspace data for Alex Vance...');
      demoUser = await User.create({
        name: 'Alex Vance',
        email: demoEmail,
        password: 'password123',
        role: 'admin',
        workspaceName: 'Nexora Core Workspace',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        themePreference: 'dark',
      });
      await seedWorkspaceDataForUser(demoUser._id, demoUser.name);
    }

    // 3. Initialize Express App
    const app = createApp();

    const server = app.listen(PORT, () => {
      logger.success(`🚀 Nexora Core API Engine running on http://localhost:${PORT}`);
      logger.info(`⚡ Health Check: http://localhost:${PORT}/api/health`);
    });

    // Graceful Shutdown
    const handleShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Shutting down Nexora API gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error: any) {
    logger.error(`Failed to bootstrap Nexora server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
