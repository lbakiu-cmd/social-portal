const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('SaaS Backend is live!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});