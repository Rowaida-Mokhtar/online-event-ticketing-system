const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


const app = express();

// Import Routes
const authRouter = require("./Backend/Routes/authRoutes");
const userRouter = require("./Backend/Routes/userRoutes");
const eventRouter = require("./Backend/Routes/eventRoutes");
const bookingRouter = require("./Backend/Routes/bookingRoutes");
// Middleware
const authenticationMiddleware = require("./Backend/Middleware/authMiddleware");
const { notFound, errorHandler } = require("./Backend/Middleware/errorMiddleware");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.js
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// CORS Config
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use('/api/v1', authRouter);               
app.use('/api/v1/users', userRouter);        
app.use('/api/v1/bookings', bookingRouter);    
app.use('/api/v1/events', eventRouter);       

app.get('/', (req, res) => {
  res.send('API is running');
});


// Not Found Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// MongoDB Connection
const db_url = process.env.MONGO_URI; 

mongoose
  .connect(db_url)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
