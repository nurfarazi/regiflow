const express = require('express');
const exportController = require('../controllers/exportController');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(authMiddleware, requireRole(ROLES.ADMIN));

router.post('/run', exportController.runExport);
router.get('/jobs', exportController.exportStatus);

module.exports = router;
