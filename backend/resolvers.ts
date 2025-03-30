// backend/resolvers.ts
import bcrypt from 'bcrypt';
import { User, Task } from './models';

export const resolvers = {
  Query: {
    tasks: async (_: any, __: any, context: any) => {
      if (!context.req.session.userId) throw new Error("Not authenticated");
      return Task.findAll({ where: { userId: context.req.session.userId } });
    },
    task: async (_: any, { id }: any, context: any) => {
      if (!context.req.session.userId) throw new Error("Not authenticated");
      return Task.findOne({ where: { id, userId: context.req.session.userId } });
    },
    me: async (_: any, __: any, context: any) => {
      if (!context.req.session.userId) return null;
      return User.findByPk(context.req.session.userId);
    }
  },
  Mutation: {
    signUp: async (_: any, { name, email, password }: any, context: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      context.req.session.userId = user.id;
      return user;
    },
    login: async (_: any, { email, password }: any, context: any) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("No user found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");
      context.req.session.userId = user.id;
      return user;
    },
    logout: async (_: any, __: any, context: any) => {
      return new Promise((resolve, reject) => {
        context.req.session.destroy((err: any) => {
          if (err) {
            console.log(err);
            return reject(false);
          }
          context.res.clearCookie('connect.sid');
          resolve(true);
        });
      });
    },
    createTask: async (_: any, { title, description, status }: any, context: any) => {
      if (!context.req.session.userId) throw new Error("Not authenticated");
      return Task.create({ title, description, status, userId: context.req.session.userId });
    },
    updateTask: async (_: any, { id, title, description, status }: any, context: any) => {
      if (!context.req.session.userId) throw new Error("Not authenticated");
      const task = await Task.findOne({ where: { id, userId: context.req.session.userId } });
      if (!task) throw new Error("Task not found");
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      await task.save();
      return task;
    },
    deleteTask: async (_: any, { id }: any, context: any) => {
      if (!context.req.session.userId) throw new Error("Not authenticated");
      const task = await Task.findOne({ where: { id, userId: context.req.session.userId } });
      if (!task) throw new Error("Task not found");
      await task.destroy();
      return true;
    }
  }
};
