const express = require('express');
const cors = require('cors'); // Import cors

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Perform whatever processing you need to do here
  console.log("Received contact form data:", req.body);

  // Send a success response
  res.json({ message: "Thank you for reaching out. I'll get back to you soon!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
