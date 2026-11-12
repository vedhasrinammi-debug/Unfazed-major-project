const store = require('../data/memoryStore');

// @desc    Get all available subscription tiers
// @route   GET /api/plans
exports.getPlans = async (req, res) => {
  try {
    const plans = store.getPlans();
    res.json({
      success: true,
      plans
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get therapist current subscription
// @route   GET /api/plans/current
exports.getCurrentSubscription = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      subscription: user.subscription || { plan: 'Free', status: 'active', billingCycle: 'monthly' }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Upgrade or modify therapist plan
// @route   POST /api/plans/upgrade
exports.upgradePlan = async (req, res) => {
  try {
    const { planName, billingCycle } = req.body;

    if (!['Free', 'Pro', 'Premium'].includes(planName)) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const updatedSub = store.updateTherapistPlan(req.user._id, planName, billingCycle || 'monthly');
    res.json({
      success: true,
      message: `Successfully updated subscription to ${planName} plan (${billingCycle || 'monthly'})`,
      subscription: updatedSub
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
