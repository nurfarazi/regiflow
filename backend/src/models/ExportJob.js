const mongoose = require('mongoose');

const exportJobSchema = new mongoose.Schema(
  {
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recordIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StaffRecord',
      },
    ],
    totalRecords: Number,
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExportJob', exportJobSchema);
