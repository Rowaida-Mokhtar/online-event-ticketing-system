const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age:{type:Number,required:false},
  profilePicture: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'organizer', 'admin'], default: 'user' },
  resetOtp: { type: Number, default: null }, // OTP for password reset
  resetOtpExpires: { type: Date, default: null }, // OTP expiry time
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);