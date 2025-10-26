const ExportJob = require('../models/ExportJob');
const StaffRecord = require('../models/StaffRecord');
const asyncHandler = require('../utils/asyncHandler');
const { RECORD_STATUS, RECORD_STATUS_FLOW } = require('../utils/constants');

const toCsv = (records) => {
  const headers = ['fullName', 'plogId', 'jobTitle', 'status', 'supplier'];
  const rows = records.map((record) => [
    record.fullName,
    record.plogId,
    record.jobTitle || '',
    record.status,
    record.supplier?.toString(),
  ]);
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
};

const runExport = asyncHandler(async (req, res) => {
  const filter = { status: RECORD_STATUS_FLOW.export.from };
  if (req.body?.supplierId) {
    filter.supplier = req.body.supplierId;
  }

  const records = await StaffRecord.find(filter);
  if (!records.length) {
    return res.json({ total: 0, message: 'No records ready for export' });
  }

  const exportedAt = new Date();
  const recordIds = records.map((record) => record._id);

  await StaffRecord.updateMany(
    { _id: { $in: recordIds } },
    { status: RECORD_STATUS_FLOW.export.to, exportedAt }
  );

  const exportJob = await ExportJob.create({
    triggeredBy: req.user._id,
    recordIds,
    totalRecords: recordIds.length,
  });

  return res.json({
    total: recordIds.length,
    exportJobId: exportJob._id,
    csvPreview: toCsv(records.slice(0, 20)),
  });
});

const exportStatus = asyncHandler(async (req, res) => {
  const jobs = await ExportJob.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('triggeredBy', 'email');

  res.json(jobs);
});

module.exports = {
  runExport,
  exportStatus,
};
