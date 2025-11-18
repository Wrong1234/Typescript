// ==================== src/config/env.ts ====================
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI! as string,
  jwtSecret: process.env.JWT_SECRET! as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d' as string,
  nodeEnv: process.env.NODE_ENV || 'development'
};
