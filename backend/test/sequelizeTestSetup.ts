import { Sequelize } from "sequelize";
import { initUserModel, UserModel } from "../models/User";
import { initTaskModel, TaskModel } from "../models/Task";

export const sequelize = new Sequelize("sqlite::memory:", { logging: false });

export async function setupTestDB() {
  await sequelize.sync({ force: true }); // Reset DB before tests
}

export function initializeModels() {
  initUserModel(sequelize);
  initTaskModel(sequelize);
}

initializeModels();
