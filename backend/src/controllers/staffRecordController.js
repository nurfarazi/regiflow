const { validationResult } = require('express-validator');
const StaffRecord = require('../models/StaffRecord');
const asyncHandler = require('../utils/asyncHandler');
const { RECORD_STATUS, RECORD_STATUS_FLOW, ROLES } = require('../utils/constants');

const buildListFilter = (user, query) => {
  const filter = {};
  if (user.role === ROLES.SUPPLIER) {
    filter.supplier = user.supplier?._id;
  } else if (query.supplierId) {
    filter.supplier = query.supplierId;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};

const listRecords = asyncHandler(async (req, res) => {
  const filter = buildListFilter(req.user, req.query);
  const records = await StaffRecord.find(filter)
    .populate('supplier', 'name code')
    .populate('createdBy', 'email role')
    .sort({ updatedAt: -1 });
  res.json(records);
});

const createRecord = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (!req.user.supplier?._id) {
    return res.status(400).json({ error: 'Supplier context missing' });
  }

  const payload = {
    ...req.body,
    supplier: req.user.supplier._id,
    createdBy: req.user._id,
  };

  const record = await StaffRecord.create(payload);
  res.status(201).json(record);
});

const updateRecord = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const record = await StaffRecord.findById(req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (
    req.user.role === ROLES.SUPPLIER &&
    String(record.supplier) !== String(req.user.supplier?._id)
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (record.status !== RECORD_STATUS.DRAFT) {
    return res.status(400).json({ error: 'Only draft records can be edited' });
  }

  Object.assign(record, req.body);
  await record.save();
  res.json(record);
});

const submitRecord = asyncHandler(async (req, res) => {
  const record = await StaffRecord.findById(req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (
    req.user.role === ROLES.SUPPLIER &&
    String(record.supplier) !== String(req.user.supplier?._id)
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (record.status !== RECORD_STATUS_FLOW.submit.from) {
    return res.status(400).json({ error: 'Record is not in draft state' });
  }

  record.status = RECORD_STATUS_FLOW.submit.to;
  record.submittedAt = new Date();
  await record.save();

  res.json(record);
});

const verifyRecord = asyncHandler(async (req, res) => {
  const record = await StaffRecord.findById(req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  if (record.status !== RECORD_STATUS_FLOW.verify.from) {
    return res.status(400).json({ error: 'Record is not in submitted state' });
  }

  record.status = RECORD_STATUS_FLOW.verify.to;
  record.verifiedAt = new Date();
  record.rejectionReason = undefined;
  await record.save();

  res.json(record);
});

module.exports = {
  listRecords,
  createRecord,
  updateRecord,
  submitRecord,
  verifyRecord,
};
