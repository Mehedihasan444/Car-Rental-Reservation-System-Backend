import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { UserValidation } from '../user/user.validation';
import auth from '../../middlewares/auth';



const router = express.Router();

router.post(
  '/signin',
  validateRequest(UserValidation.signInUserValidationSchema),
  authControllers.signin,
);


router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserValidationSchema),
  authControllers.signup,
);


export const AuthRoutes = router;
