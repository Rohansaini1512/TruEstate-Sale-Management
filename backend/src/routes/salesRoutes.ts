import { Router } from 'express';
import { getSalesRecords, getFilterOptionsHandler } from '../controllers/salesController';

const router = Router();


router.get('/', getSalesRecords);


router.get('/filters', getFilterOptionsHandler);

export default router;
