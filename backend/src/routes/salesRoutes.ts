import { Router } from 'express';
import { getSalesRecords, getFilterOptionsHandler } from '../controllers/salesController';

const router = Router();

/**
 * GET /api/sales
 * Query sales records with filtering, sorting, and pagination
 */
router.get('/', getSalesRecords);

/**
 * GET /api/sales/filters
 * Get available filter options
 */
router.get('/filters', getFilterOptionsHandler);

export default router;
