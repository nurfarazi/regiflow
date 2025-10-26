const express = require('express');
const { body } = require('express-validator');
const supplierController = require('../controllers/supplierController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(authMiddleware, requireRole(ROLES.ADMIN));

router.get('/', supplierController.listSuppliers);

router.post(
  '/',
  [
    body('name').notEmpty(),
    body('code').notEmpty().isLength({ min: 2 }),
    body('contactEmail').isEmail(),
    body('isActive').optional().isBoolean(),
  ],
  supplierController.createSupplier
);

router.put(
  '/:id',
  [
    body('name').optional().notEmpty(),
    body('contactEmail').optional().isEmail(),
    body('isActive').optional().isBoolean(),
  ],
  supplierController.updateSupplier
);

module.exports = router;
