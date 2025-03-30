// backend/seeders/seed.ts

import { sequelize } from '../models'; // Ensure models/index.ts exports the sequelize instance, User, and Task
import { UserModel as User } from '../models/User';
import { TaskModel as Task } from '../models/Task';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    // Force sync the database (WARNING: this will drop existing tables)
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    // Hash the default password
    const passwordHash = await bcrypt.hash('password', 10);

    // Seed users
    const users = await User.bulkCreate([
      { name: 'Alice', email: 'alice@example.com', password: passwordHash },
      { name: 'Bob', email: 'bob@example.com', password: passwordHash }
    ], { returning: true });
    console.log('Seeded users:', users.map(u => u.email));

    // Seed tasks associated with the seeded users
    await Task.bulkCreate([
      { title: 'Task 1', description: "Alice's first task", status: 'pending', userId: users[0].id },
      { title: 'Task 2', description: "Alice's second task", status: 'in-progress', userId: users[0].id },
      { title: 'Task 3', description: "Bob's first task", status: 'completed', userId: users[1].id }
    ]);
    console.log('Seeded tasks successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed();
