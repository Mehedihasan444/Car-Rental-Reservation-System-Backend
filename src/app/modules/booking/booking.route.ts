import express from 'express';
import { BookingControllers } from './booking.controller';

const router = express.Router()

router.post('/',BookingControllers.createBooking)

router.get('/',BookingControllers.getAllBookings)
// router.get('/:id',BookingControllers.getABooking)
// router.delete('/:id',BookingControllers.deleteABooking)
// router.patch('/:id',BookingControllers.updateABooking)

export const BookingRoutes = router