import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { initUserModel } from './User';
import { initTaskModel } from './Task';

// Load environment variables
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'task-manager',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || '', // Empty string for no password
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: process.env.APP_DEBUG === 'true' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit if connection fails
  }
})();

// Initialize models
export const User = initUserModel(sequelize);
export const Task = initTaskModel(sequelize);

// Define associations
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Sync models
(async () => {
  try {
    await sequelize.sync({ alter: process.env.APP_DEBUG === 'true' });
    console.log('Database tables synchronized.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
})();