import { MikroORM } from '@mikro-orm/core';
import { MySqlDriver, defineConfig } from '@mikro-orm/mysql';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Grocery } from '../entities/Grocery';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { Migrator } from '@mikro-orm/migrations';

dotenv.config();

export default defineConfig({
  entities: [User, Grocery, Order, OrderItem],
  dbName: process.env.DB_NAME,
  driver: MySqlDriver,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  debug: true,
  extensions: [Migrator],
});

// for DI in controllers
export const DI = {} as {
  orm: MikroORM;
  em: ReturnType<MikroORM['em']['fork']>;
};
