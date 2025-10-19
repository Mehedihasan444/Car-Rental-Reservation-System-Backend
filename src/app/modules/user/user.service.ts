
import { User } from "./user.model";


// get a single User from the database
const getAUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// update a User with a new value
const updateAUser = async (id: string, updateData: Record<string, unknown>) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a User from the database
const deleteAUser = async (id: string) => {
  const result = await User.findByIdAndUpdate(id,{
    $set: { isDeleted: true }
  });
  return result;
};
// get all User from the database
const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

// get current user by email from JWT token
const getCurrentUser = async (email: string) => {
  const result = await User.findOne({ email }).select('-password'); // Exclude password from response
  return result;
};

export const UserServices = {
  getAUser,
  getCurrentUser,
  updateAUser,
  deleteAUser,
  getAllUsers,
};
