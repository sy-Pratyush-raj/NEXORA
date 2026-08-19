import mongoose, { Schema, Document } from 'mongoose';
import { IActivity } from '../types';

export interface IActivityDocument extends Omit<IActivity, '_id'>, Document {}

const ActivitySchema = new Schema<IActivityDocument>(
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
      index: true,
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    type: {
      type: String,
      enum: [
        'project_created',
        'project_updated',
        'project_deleted',
        'task_created',
        'task_updated',
        'task_completed',
        'task_blocked',
        'task_deleted',
        'milestone_reached',
        'insight_generated',
      ],
      required: true,
    },
    actor: {
      name: { type: String, default: 'Alex Vance' },
      avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

ActivitySchema.index({ userId: 1, createdAt: -1 });

export const Activity = mongoose.model<IActivityDocument>('Activity', ActivitySchema);
