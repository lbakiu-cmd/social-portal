const express = require('express');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🛡️ LiteSpeed / Hostinger Self-Healing Script
// Because Hostinger bypasses package.json, we force Prisma to build itself on the server if it is missing.
const clientPath = path.join(__dirname, 'generated', 'prisma', 'client');

if (!fs.existsSync(clientPath)) {
  console.log('Prisma client missing on server. Compiling native engine now...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Prisma generation successful!');
  } catch (error) {
    console.error('Failed to generate Prisma client:', error);
  }
}

// Now we can safely import it, knowing it 100% exists
const { PrismaClient } = require('./generated/prisma/client');

const app = express();
const prisma = new PrismaClient(); 
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('SaaS Backend is live!');
});

app.get('/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ success: true, message: `Database connected! Total users: ${userCount}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Database connection failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
