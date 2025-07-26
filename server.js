const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const MAIN_DIR = 'src'; // Main directory containing static files

app.use(express.static(path.join(__dirname, MAIN_DIR)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, MAIN_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, MAIN_DIR)}`);
  console.log(`🌐 Open your browser and navigate to: http://localhost:${PORT}`);
}); 