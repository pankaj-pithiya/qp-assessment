import { Router } from 'express';
import { listGroceries, createOrder, getOrders } from '../controllers/userController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { Role } from '../entities/User';

const router = Router();

// Authenticated user routes
router.use(authenticateJWT, authorizeRoles(Role.USER));

router.get('/groceries', listGroceries);
router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;
