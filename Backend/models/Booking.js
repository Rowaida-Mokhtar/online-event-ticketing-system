const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  numberOfTickets: { type: Number, required: true,min:1 },
  totalPrice: { type: Number, required: true,min:0 },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending', set: (value) => value.toLowerCase(),},
},{timestamps:true});

module.exports = mongoose.model('Booking', bookingSchema);