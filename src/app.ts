// ==================== src/app.ts ====================
import express, { Application } from 'express';
import { config } from './config/env';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './auth/auth.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.use(errorHandler);

connectDatabase().then(() => {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
  });
});

export default app;