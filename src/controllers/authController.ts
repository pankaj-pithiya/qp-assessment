import { Request, Response } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DI } from '../config/mikro-orm.config';
import { User, Role } from '../entities/User';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await DI.em.findOne(User, { email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await hash(password, 10);
    const user = DI.em.create(User, { name, email, password: hashedPassword, role: role || Role.USER, orders: [] });
    await DI.em.persistAndFlush(user);
    return res.status(201).json({ message: 'User registered' });
  } catch (e) {
    console.error("e", e);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await DI.em.findOne(User, { email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed' });
  }
};
