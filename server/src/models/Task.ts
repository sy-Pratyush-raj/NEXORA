import mongoose, { Schema, Document } from 'mongoose';
import { ITask } from '../types';

export interface ITaskDocument extends Omit<ITask, '_id'>, Document {}

const TaskSchema = new Schema<ITaskDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Task must belong to a project'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [140, 'Task title cannot exceed 140 characters'],
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'Blocked', 'Done'],
      default: 'Todo',
      index: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    assignee: {
      name: { type: String, default: 'Sarah Chen' },
      avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      },
    },
    dueDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    blockedReason: {
      type: String,
      default: '',
    },
    blockedDays: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

TaskSchema.index({ userId: 1, projectId: 1, status: 1 });
TaskSchema.index({ userId: 1, dueDate: 1 });

export const Task = mongoose.model<ITaskDocument>('Task', TaskSchema);
