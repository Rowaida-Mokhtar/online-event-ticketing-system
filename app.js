const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import Routes
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const bookingRouter = require("./routes/bookingRoutes");

// Middleware
const authenticationMiddleware = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

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
app.use("/api/v1", authRouter); // for /register, /login, /forgetPassword
app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookings", bookingRouter);

// Not Found Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// MongoDB Connection
const db_name = process.env.DB_NAME || "event_ticketing";
const db_url = `${process.env.DB_URL}/${db_name}`; // fallback to local or cloud

mongoose
  .connect(db_url)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
