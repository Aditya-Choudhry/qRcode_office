
import dotenv from 'dotenv';

dotenv.config();

export const SESSION_DURATION = process.env.SESSION_DURATION || '1h';