import { setupTestDB, sequelize } from "./sequelizeTestSetup";
import { TaskModel } from "../models/Task";

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Task Model", () => {
  test("should create and fetch a task", async () => {
    const newTask = await TaskModel.create({
      title: "New Task",
      description: "Testing task creation",
      status: "in-progress",
      userId: 1,
    });

    const task = await TaskModel.findOne({ where: { id: newTask.id } });

    expect(task).toBeDefined();
    expect(task?.title).toBe("New Task");
    expect(task?.status).toBe("in-progress");
  });
});
