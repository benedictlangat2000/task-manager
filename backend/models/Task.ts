// backend/models/Task.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

export class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'in-progress' | 'completed';
  public userId!: number;
}

export function initTaskModel(sequelize: Sequelize) {
  TaskModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      status: {
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue: 'pending'
      },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      tableName: 'tasks'
    }
  );
  return TaskModel;
}
