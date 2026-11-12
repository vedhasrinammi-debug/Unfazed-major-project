const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    default: '1995-05-15'
  },
  gender: {
    type: String,
    enum: ['Female', 'Male', 'Non-Binary', 'Prefer not to say', 'Other'],
    default: 'Prefer not to say'
  },
  status: {
    type: String,
    enum: ['Active', 'On-Hold', 'Completed', 'Inactive'],
    default: 'Active'
  },
  primaryDiagnosis: {
    type: String,
    default: 'Generalized Anxiety Disorder'
  },
  secondaryDiagnosis: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  intakeDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  emergencyContact: {
    name: { type: String, default: '' },
    relationship: { type: String, default: '' },
    phone: { type: String, default: '' }
  },
  insurance: {
    provider: { type: String, default: 'Self-Pay / Out of Network' },
    policyNumber: { type: String, default: 'N/A' },
    copay: { type: Number, default: 0 }
  },
  preferredSessionType: {
    type: String,
    enum: ['Video session', 'In-person', 'Phone check-in'],
    default: 'Video session'
  },
  treatmentGoals: [{
    type: String
  }],
  notesCount: {
    type: Number,
    default: 0
  },
  sessionsCompleted: {
    type: Number,
    default: 0
  },
  totalBilled: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);
