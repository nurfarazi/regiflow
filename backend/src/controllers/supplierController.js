const { validationResult } = require('express-validator');
const Supplier = require('../models/Supplier');
const asyncHandler = require('../utils/asyncHandler');

const listSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find().sort({ createdAt: -1 });
  res.json(suppliers);
});

const createSupplier = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const supplier = await Supplier.create(req.body);
  res.status(201).json(supplier);
});

const updateSupplier = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!supplier) {
    return res.status(404).json({ error: 'Supplier not found' });
  }

  res.json(supplier);
});

module.exports = {
  listSuppliers,
  createSupplier,
  updateSupplier,
};
