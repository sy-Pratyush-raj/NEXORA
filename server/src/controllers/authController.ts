import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { seedWorkspaceDataForUser } from '../services/seedService';
import { AuthRequest } from '../types';

const generateToken = (id: string, email: string, name: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'nexora_production_super_secret_jwt_key_2026_acdyon_challenge_token';
  return jwt.sign({ id, email, name, role }, secret, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, workspaceName } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
      return;
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      workspaceName: workspaceName || `${name}'s Workspace`,
    });

    // Seed realistic workspace data for new user immediately
    await seedWorkspaceDataForUser(user._id, user.name);

    const token = generateToken(user._id.toString(), user.email, user.name, user.role);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user._id.toString(), user.email, user.name, user.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
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

export const demoLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const demoEmail = 'alex.vance@nexora.io';
    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: 'Alex Vance',
        email: demoEmail,
        password: 'password123',
        role: 'admin',
        workspaceName: 'Nexora Core Workspace',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
      await seedWorkspaceDataForUser(user._id, user.name);
    }

    const token = generateToken(user._id.toString(), user.email, user.name, user.role);

    res.status(200).json({
      success: true,
      message: 'Logged in as Demo User (Alex Vance).',
      token,
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

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    res.status(200).json({
      success: true,
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

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};
