import { Router } from 'express';
import {
  createGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery,
  updateInventory
} from '../controllers/adminController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { Role } from '../entities/User';

const router = Router();

// Admin-only routes
router.use(authenticateJWT, authorizeRoles(Role.ADMIN));

router.post('/groceries', createGrocery);
router.get('/groceries', getGroceries);
router.put('/groceries/:id', updateGrocery);
router.delete('/groceries/:id', deleteGrocery);
router.patch('/groceries/:id/inventory', updateInventory);

export default router;
