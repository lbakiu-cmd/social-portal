const express = require('express');
// 1. IMPORT PrismaClient FIRST
const { PrismaClient } = require('./generated/prisma/client');

const app = express();

// 2. INITIALIZE it SECOND
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