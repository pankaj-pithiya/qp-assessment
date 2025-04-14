import { Request, Response } from 'express';
import { DI } from '../config/mikro-orm.config';
import { Grocery } from '../entities/Grocery';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { User } from '../entities/User';

export const listGroceries = async (_req: Request, res: Response) => {
  try {
    const groceries = await DI.em.find(Grocery, { inventory: { $gt: 0 } });
    res.status(200).json(groceries);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch groceries' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { items } = req.body; // [{ groceryId: number, quantity: number }]
  const userId = req.user!.id;

  try {
    const user = await DI.em.findOne(User, { id: userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const order: any = DI.em.create(Order, { user, items: [], createdAt: new Date() });

    let total = 0;

    for (const item of items) {
      const grocery = await DI.em.findOne(Grocery, { id: item.groceryId });
      if (!grocery || grocery.inventory < item.quantity) {
        return res.status(400).json({ message: `Item unavailable: ${item.groceryId}` });
      }

      const orderItem = DI.em.create(OrderItem, {
        order,
        grocery,
        quantity: item.quantity,
        price: grocery.price * item.quantity
      });

      grocery.inventory -= item.quantity;
      order.items.add(orderItem);
      total += orderItem.price;
    }

    await DI.em.persistAndFlush(order);
    res.status(201).json({ message: 'Order placed', total });
  } catch (e) {
    res.status(500).json({ message: 'Failed to create order' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const orders = await DI.em.find(Order, { user: { id: userId } }, {
      populate: ['items.grocery']
    });
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
