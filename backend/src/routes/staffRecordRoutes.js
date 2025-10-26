const express = require('express');
const { body } = require('express-validator');
const staffRecordController = require('../controllers/staffRecordController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(authMiddleware);

router.get('/', staffRecordController.listRecords);

const recordValidation = [
  body('fullName').notEmpty(),
  body('plogId').notEmpty(),
  body('jobTitle').optional().isString(),
];

router.post('/', requireRole(ROLES.SUPPLIER), recordValidation, staffRecordController.createRecord);

router.put('/:id', requireRole(ROLES.SUPPLIER), recordValidation, staffRecordController.updateRecord);

router.post('/:id/submit', requireRole(ROLES.SUPPLIER), staffRecordController.submitRecord);

router.post('/:id/verify', requireRole(ROLES.ADMIN), staffRecordController.verifyRecord);

module.exports = router;
