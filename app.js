const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//
// const cors = require("cors");
require("dotenv").config();

const app = express();

// Import Routes
const authRouter = require("./Backend/Routes/authRoutes");
const userRouter = require("./Backend/Routes/userRoutes");
const eventRouter = require("./Routes/eventRoutes");
const bookingRouter = require(".Routes/bookingRoutes");
// Middleware
const authenticationMiddleware = require("./Middleware/authMiddleware");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Config
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes
app.use('/api/v1', authRoutes);                // Handles: /register, /login, /forgetPassword
app.use('/api/v1/users', userRoutes);          // Handles: /users, /users/:id, /users/profile, etc.
app.use('/api/v1/bookings', bookingRoutes);    // Handles: /bookings, /bookings/:id
app.use('/api/v1/events', eventRoutes);        // Handles: /events, /events/:id


// Not Found Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// MongoDB Connection
const db_name = process.env.DB_NAME || "event_ticketing";
const db_url = `${process.env.DB_URL}/${db_name}`; // fallback to local or cloud

mongoose
  .connect(db_url)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));



// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
