import { Car } from "./car.model";
import { TCar } from "./cart.interface";

const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getACar = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateACar = async (carId: string, updateData: any) => {
  const result = await Car.findByIdAndUpdate(
    carId,
    { $set: updateData },
    { new: true }
  );
  return result;
};
const deleteACar = async (id: string) => {
  const result = await Car.findByIdAndDelete(id);
  return result;
};
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
