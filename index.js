const express = require('express');
// Import from the root of the generated folder, not the inner client!
const { PrismaClient } = require('./generated/prisma');

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