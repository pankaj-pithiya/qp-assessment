import { Request, Response } from 'express';
import { DI } from '../config/mikro-orm.config';
import { Grocery } from '../entities/Grocery';

export const createGrocery = async (req: Request, res: Response) => {
  const { name, price, inventory } = req.body;
  try {
    const grocery = DI.em.create(Grocery, { name, price, inventory });
    await DI.em.persistAndFlush(grocery);
    res.status(201).json(grocery);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create grocery' });
  }
};

export const getGroceries = async (_req: Request, res: Response) => {
  try {
    const groceries = await DI.em.find(Grocery, {});
    res.status(200).json(groceries);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch groceries' });
  }
};

export const updateGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const grocery = await DI.em.findOne(Grocery, { id: Number(id) });
    if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

    if (name) grocery.name = name;
    if (price) grocery.price = price;

    await DI.em.flush();
    res.status(200).json(grocery);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update grocery' });
  }
};

export const deleteGrocery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const grocery = await DI.em.findOne(Grocery, { id: Number(id) });
    if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

    await DI.em.removeAndFlush(grocery);
    res.status(200).json({ message: 'Grocery deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete grocery' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { inventory } = req.body;
  try {
    const grocery = await DI.em.findOne(Grocery, { id: Number(id) });
    if (!grocery) return res.status(404).json({ message: 'Grocery not found' });

    grocery.inventory = inventory;
    await DI.em.flush();
    res.status(200).json(grocery);
  } catch (e) {
    res.status(500).json({ message: 'Failed to update inventory' });
  }
};
