const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./models/Contact"); // Import the Contact model
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); // Make sure to include this line

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Contact route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact document
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to MongoDB
    await newContact.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "Thank you for reaching out. I'll get back to you soon!",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      message: "There was an error sending your message. Please try again.",
    });
  }
});

// Get all contacts route


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
