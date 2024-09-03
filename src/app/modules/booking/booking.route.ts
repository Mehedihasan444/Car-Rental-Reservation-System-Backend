import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidations } from './booking.validation';

const router = express.Router()

router.post('/',validateRequest(bookingValidations.BookingValidationSchema),auth(USER_ROLE.user),BookingControllers.createBooking)
router.get('/',auth(USER_ROLE.admin) ,BookingControllers.getAllBookings)
router.get('/my-bookings',auth(USER_ROLE.user),BookingControllers.getUsersBooking)
router.put('/:id',validateRequest(bookingValidations.BookingUpdateValidationSchema),auth(USER_ROLE.user),BookingControllers.updateBooking)
router.delete('/:id',auth(USER_ROLE.user),BookingControllers.deleteBooking)
export const BookingRoutes = router