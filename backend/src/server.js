require('dotenv').config();
const createApp = require('./app');
const { connectDb } = require('./config/db');
const User = require('./models/User');
const { ROLES } = require('./utils/constants');

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

const seedDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  if (!email || !password) {
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  await User.create({
    email,
    password,
    role: ROLES.ADMIN,
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded default admin user (${email}). Please change the password immediately.`);
};

const bootstrap = async () => {
  try {
    await connectDb(mongoUri);
    await seedDefaultAdmin();
    const app = createApp();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

bootstrap();
