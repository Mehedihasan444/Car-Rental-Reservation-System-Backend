import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { UserValidation } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

// Get current user profile
router.get("/me", auth(USER_ROLE.user, USER_ROLE.admin), UserControllers.getCurrentUser);

router.get("/", auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get("/:id", auth(USER_ROLE.user), UserControllers.getAUser);
router.put(
  "/:id",
  validateRequest(UserValidation.updateUserValidationSchema),
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.updateAUser
);
router.delete("/:id", auth(USER_ROLE.admin), UserControllers.deleteAUser);

export const UserRoutes = router;
