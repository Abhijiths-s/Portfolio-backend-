const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./models/contact"); // Import the Contact model
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); // Make sure to include this line

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Contact route
app.post("/api/contact", async (req, res) => {
  console.log("Contact form submitted");
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
// Get all contacts route
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from MongoDB
    res.status(200).json(contacts); // Send the contacts as JSON
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "There was an error fetching contacts. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
