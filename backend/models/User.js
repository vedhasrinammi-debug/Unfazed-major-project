const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['therapist', 'admin'],
    default: 'therapist'
  },
  specialization: {
    type: String,
    default: 'Clinical Psychology & CBT'
  },
  licenseNumber: {
    type: String,
    default: 'PSY-NY-84920'
  },
  practiceName: {
    type: String,
    default: 'Mindful Horizons Therapy Clinic'
  },
  phone: {
    type: String,
    default: '+1 (555) 234-5678'
  },
  bio: {
    type: String,
    default: 'Licensed psychotherapist dedicated to providing evidence-based, compassionate care.'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250'
  },
  subscription: {
    plan: {
      type: String,
      enum: ['Free', 'Pro', 'Premium'],
      default: 'Pro'
    },
    status: {
      type: String,
      enum: ['active', 'past_due', 'cancelled'],
      default: 'active'
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'annual'],
      default: 'monthly'
    },
    renewsAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  },
  settings: {
    emailNotifications: { type: Boolean, default: true },
    appointmentReminders: { type: Boolean, default: true },
    sessionBufferMinutes: { type: Number, default: 15 },
    currency: { type: String, default: 'USD' },
    defaultSessionFee: { type: Number, default: 150 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
