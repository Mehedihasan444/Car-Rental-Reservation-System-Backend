import { Car } from "./car.model";
import { TCar } from "./car.interface";
import QueryBuilder from "../../builder/QueryBuilder";

// create a new car in the database
const createCar = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
// get a single car from the database
const getACar = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

// update a car with a new value
const updateACar = async (id: string, updateData: Record<string, unknown>) => {
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
const getAllCars = async (payload: Record<string, unknown>) => {
  // const result = await Car.find();
  // return result;
  // Create a new QueryBuilder instance for the car query
  const carQuery = new QueryBuilder(Car.find({}), payload)
    .search(["features",])
    .filter()
    .sort()
    .paginate();

  // Execute the query to get the paginated results
  const result = await carQuery.modelQuery;

  // Create a separate query to count the total number of cars matching the filter criteria
  const countQuery = new QueryBuilder(Car.find({}), payload)
    .search(["name", "description"])
    .filter();

  // Execute the count query to get the total count
  const totalCount = await countQuery.modelQuery.countDocuments();

  // Return both the paginated results and the total count
  return {
    totalCount,
    cars: result,
  };
};

export const CarServices = {
  createCar,
  getACar,
  updateACar,
  deleteACar,
  getAllCars,
};
