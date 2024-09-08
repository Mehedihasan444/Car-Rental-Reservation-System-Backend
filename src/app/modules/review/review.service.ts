import { TReview } from "./review.interface";
import { Review } from "./review.model";


// create a new Review in the database
const createReview = async (payload: TReview) => {
  const result = (await Review.create(payload)).populate("car");
  return result;
};
// get a single Review from the database
const getAReview = async (id: string) => {
  const result = await Review.find({car:id});

  return result;
};

// update a Review with a new value
const updateAReview = async (id: string, updateData: Record<string, unknown>) => {
  const result = await Review.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a Review from the database
const deleteAReview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  return result;
};
// get all Review from the database
const getAllReviews = async () => {
  const result = await Review.find().populate("car");;
  return result;
};

export const ReviewServices = {
  createReview,
  getAReview,
  updateAReview,
  deleteAReview,
  getAllReviews,
};
