import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Explicitly load the .env file
config();

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});