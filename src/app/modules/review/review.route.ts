import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ReviewControllers } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ReviewValidation.reviewValidationSchema),
  ReviewControllers.createReview
);
router.get("/", ReviewControllers.getAllReviews);
router.get("/:id", ReviewControllers.getAReview);
router.put(
  "/:id",
  validateRequest(ReviewValidation.updateReviewValidationSchema),
  auth(USER_ROLE.user),
  ReviewControllers.updateAReview
);
router.delete("/:id", auth(USER_ROLE.admin,USER_ROLE.user), ReviewControllers.deleteAReview);

export const ReviewRoutes = router;
