import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import env from './env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storagePath = path.isAbsolute(env.dbStorage)
  ? env.dbStorage
  : path.resolve(__dirname, '../../', env.dbStorage);

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: env.nodeEnv === 'development' ? false : false,
});

export default sequelize;
