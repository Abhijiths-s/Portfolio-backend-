const express = require('express');
const cors = require('cors'); 

const app = express();


app.use(cors()); 
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  
  console.log("Received contact form data:", req.body);

 
  res.json({ message: "Thank you for reaching out. I'll get back to you soon!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
