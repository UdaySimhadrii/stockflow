import { sequelize } from '../models/index.js';

export const connectDatabase = async () => {
  await sequelize.authenticate();
  // sync() creates tables if they don't exist yet. Safe for SQLite MVP use.
  // For production with a real Postgres/MySQL instance, replace with migrations.
  await sequelize.sync();
  // eslint-disable-next-line no-console
  console.log('[database] Connected and synced successfully.');
};

export default connectDatabase;
