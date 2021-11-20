import express from 'express';
import {createOrder, handlePayment} from '../controllers/orderControll.js';


const router = express.Router();

router.post('/api/v1/order', createOrder);

router.post('/api/v1/payment', handlePayment);

export default router;
