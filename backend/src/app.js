const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const staffRecordRoutes = require('./routes/staffRecordRoutes');
const exportRoutes = require('./routes/exportRoutes');
const errorHandler = require('./middleware/errorHandler');

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/suppliers', supplierRoutes);
  app.use('/api/staff-records', staffRecordRoutes);
  app.use('/api/exports', exportRoutes);

  app.use(errorHandler);

  return app;
};

module.exports = createApp;
