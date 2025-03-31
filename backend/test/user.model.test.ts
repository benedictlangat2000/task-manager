import { setupTestDB, sequelize } from "./sequelizeTestSetup";
import { UserModel } from "../models/User";
import '@types/jest';

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Model", () => {
  test("should create and fetch a user", async () => {
    const newUser = await UserModel.create({
      name: "Brian Njoro",
      email: "briannjoro@gmail.com",
      password: "hashedpassword",
    });

    const user = await UserModel.findOne({ where: { email: "briannjoro@gmail.com" } });

    expect(user).toBeDefined();
    expect(user?.name).toBe("Brian Njoro");
    expect(user?.email).toBe("briannjoro@gmail.com");
  });
});
