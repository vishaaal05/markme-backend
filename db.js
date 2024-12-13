// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware for parsing JSON

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "secret321#";

// Employee Schema
const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

// Employee Model
const Employee = model("Employee", employeeSchema);

// Routes
app.post("/signup", async (req, res) => {
  try {
    // Validate input
    const { name, email, role, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new employee
    const employee = await Employee.create({ name, email, role, password });

    // Generate JWT Token
    const token = jwt.sign({ employeeId: employee._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Response
    res.status(201).json({
      message: "Employee created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


