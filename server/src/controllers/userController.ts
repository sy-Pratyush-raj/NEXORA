import { Response, NextFunction } from 'express';
import { User } from '../models/User';
import { AuthRequest } from '../types';

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { name, workspaceName, themePreference, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, workspaceName, themePreference, avatar } },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        workspaceName: user.workspaceName,
        themePreference: user.themePreference,
      },
    });
  } catch (error) {
    next(error);
  }
};
