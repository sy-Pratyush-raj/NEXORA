import mongoose, { Schema, Document } from 'mongoose';
import { IProject } from '../types';

export interface IProjectDocument extends Omit<IProject, '_id'>, Document {}

const ProjectSchema = new Schema<IProjectDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      maxlength: [80, 'Project name cannot exceed 80 characters'],
    },
    key: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      maxlength: 10,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Healthy', 'At Risk', 'Delayed', 'Completed'],
      default: 'Healthy',
      index: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    leadName: {
      type: String,
      default: 'Alex Vance',
    },
    targetDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    tags: {
      type: [String],
      default: ['core', 'q3'],
    },
    metrics: {
      totalTasks: { type: Number, default: 0 },
      completedTasks: { type: Number, default: 0 },
      blockedTasks: { type: Number, default: 0 },
      velocityScore: { type: Number, default: 85 },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying user projects by status
ProjectSchema.index({ userId: 1, status: 1 });
ProjectSchema.index({ userId: 1, createdAt: -1 });

export const Project = mongoose.model<IProjectDocument>('Project', ProjectSchema);
