import express from 'express';
import dotenv from 'dotenv';
import mikroOrmConfig, { DI } from './config/mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

const startServer = async () => {
  try {
    DI.orm = await MikroORM.init(mikroOrmConfig);
    DI.em = DI.orm.em.fork();

    // 👇 This is the key line: auto update schema from entities (no migration file)
    await DI.orm.getSchemaGenerator().updateSchema();

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('Failed to start server', err);
  }
};

startServer();
