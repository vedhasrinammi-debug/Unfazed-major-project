const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
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
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  sessionDate: {
    type: String,
    required: true
  },
  sessionNumber: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    required: true,
    default: 'Clinical Progress & SOAP Note'
  },
  // Privacy Control: Private therapist-only vs Shared with client
  isSharedWithClient: {
    type: Boolean,
    default: false
  },
  // Clinical SOAP Architecture
  soap: {
    subjective: {
      type: String,
      default: '' // Client reported mood, current stressors, somatic experiences
    },
    objective: {
      type: String,
      default: '' // Therapist observations: affect, speech, eye contact, alertness
    },
    assessment: {
      type: String,
      default: '' // Clinical formulation, progress against treatment goals
    },
    plan: {
      type: String,
      default: '' // Intervention strategies, next session focus, homework assigned
    }
  },
  // Client-Shared Summary (visible to client if isSharedWithClient = true)
  clientSharedSummary: {
    takeaways: { type: String, default: '' },
    actionItems: [{ type: String }],
    copingTools: [{ type: String }]
  },
  riskAssessment: {
    level: {
      type: String,
      enum: ['None / Low Risk', 'Moderate - Monitored', 'High Risk - Safety Plan Active'],
      default: 'None / Low Risk'
    },
    safetyPlanDiscussed: { type: Boolean, default: false }
  },
  tags: [{ type: String }],
  isSigned: {
    type: Boolean,
    default: true
  },
  signedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);
