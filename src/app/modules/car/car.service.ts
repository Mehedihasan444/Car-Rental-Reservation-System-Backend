import { Car } from "./car.model";
import { TCar } from "./cart.interface";

// create a new car in the database
const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
// get a single car from the database
const getACar = async (id: string) => {
  console.log(id)
  const result = await Car.findById(id);
  return result;
};

// update a car with a new value
const updateACar = async (id: string, updateData: any) => {

  const result = await Car.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
  return result;
};
// delete a car from the database
const deleteACar = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};
// get all car from the database
const getAllCars = async () => {
  const result = await Car.find();
  return result;
};

export const CarServices = {
  createCar,
  getACar,
  updateACar,
  deleteACar,
  getAllCars,
};
