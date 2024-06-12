import express from 'express';
import { CarControllers } from './car.controller';


const router = express.Router()

router.post('/',CarControllers.createCar)

router.get('/',CarControllers.getAllCars)
router.get('/:id',CarControllers.getACar)
router.delete('/:id',CarControllers.deleteACar)
router.patch('/:id',CarControllers.updateACar)

export const CarRoutes = router