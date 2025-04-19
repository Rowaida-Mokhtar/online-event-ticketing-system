const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  ticketPrice: { type: Number, required: true,min:0 },
  totalTickets: { type: Number, required: true,min:1 },
  remainingTickets: { type: Number, required: true,min:0},
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['approved', 'pending', 'declined'], default: 'pending', set: (value) => value.toLowerCase(), },
},{timestamps:true});

module.exports = mongoose.model('Event', eventSchema);

