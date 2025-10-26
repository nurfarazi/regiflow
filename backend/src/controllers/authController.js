const { validationResult } = require('express-validator');
const User = require('../models/User');
const Supplier = require('../models/Supplier');
const { generateAccessToken } = require('../utils/token');
const asyncHandler = require('../utils/asyncHandler');
const { ROLES } = require('../utils/constants');

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role = ROLES.SUPPLIER, supplierId } = req.body;

  if (role === ROLES.SUPPLIER && !supplierId) {
    return res.status(400).json({ error: 'supplierId is required for supplier role' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  let supplier = null;
  if (supplierId) {
    supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
  }

  const user = await User.create({
    email,
    password,
    role,
    supplier: supplier ? supplier._id : undefined,
  });

  const token = generateAccessToken(user);
  return res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      supplier: user.supplier,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate('supplier');

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateAccessToken(user);
  return res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      supplier: user.supplier,
    },
  });
});

const me = asyncHandler(async (req, res) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
    supplier: req.user.supplier,
  });
});

module.exports = {
  register,
  login,
  me,
};
