const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../data/memoryStore');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new therapist
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, specialization, licenseNumber, practiceName, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const existingUser = store.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = store.createUser({
      name,
      email,
      password: hashedPassword,
      specialization: specialization || 'Clinical Psychology',
      licenseNumber: licenseNumber || 'LIC-' + Math.floor(100000 + Math.random() * 900000),
      practiceName: practiceName || `${name.split(' ')[0]}'s Practice`,
      phone: phone || '+1 (555) 000-0000',
      role: 'therapist'
    });

    const token = generateToken(newUser._id);

    const userResponse = { ...newUser };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Authenticate therapist & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Quick 1-Click Demo Login for Evaluators & Testing
// @route   POST /api/auth/demo-login
exports.demoLogin = async (req, res) => {
  try {
    const user = store.findUserByEmail('sarah.mitchell@unfazed.health') || store.users[0];
    const token = generateToken(user._id);

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Logged in as Demo Therapist Dr. Sarah Mitchell',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current logged in therapist profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      success: true,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update therapist profile & practice settings
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // password change can be handled separately

    const updatedUser = store.updateUser(req.user._id, updates);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const userResponse = { ...updatedUser };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
