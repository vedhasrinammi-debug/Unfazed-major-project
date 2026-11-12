const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true // YYYY-MM-DD
  },
  startTime: {
    type: String,
    required: true // e.g. "10:00 AM"
  },
  endTime: {
    type: String,
    required: true // e.g. "10:50 AM"
  },
  durationMinutes: {
    type: Number,
    default: 50
  },
  type: {
    type: String,
    enum: ['Video session', 'In-person', 'Phone check-in'],
    default: 'Video session'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'No-show'],
    default: 'Scheduled'
  },
  locationOrRoom: {
    type: String,
    default: 'UNFAZED Telehealth Room'
  },
  meetingLink: {
    type: String,
    default: ''
  },
  sessionFee: {
    type: Number,
    default: 150
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Waived'],
    default: 'Pending'
  },
  notesCompleted: {
    type: Boolean,
    default: false
  },
  clientGoalsSummary: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
