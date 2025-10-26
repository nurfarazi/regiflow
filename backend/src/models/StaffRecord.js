const mongoose = require('mongoose');
const { RECORD_STATUS } = require('../utils/constants');

const staffRecordSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    plogId: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      trim: true,
    },
    nationalId: String,
    passportNumber: String,
    photoFilename: String,
    status: {
      type: String,
      enum: Object.values(RECORD_STATUS),
      default: RECORD_STATUS.DRAFT,
    },
    rejectionReason: String,
    submittedAt: Date,
    verifiedAt: Date,
    exportedAt: Date,
  },
  { timestamps: true }
);

staffRecordSchema.index({ supplier: 1, status: 1 });
staffRecordSchema.index({ plogId: 1 }, { unique: true });

module.exports = mongoose.model('StaffRecord', staffRecordSchema);
