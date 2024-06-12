import { Schema, model } from 'mongoose';
import { CarModel, TCar } from './cart.interface';

const carSchema = new Schema<TCar, CarModel>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
},
{
  timestamps: true,
});


carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
carSchema.statics.isCarExists = async function (id: string) {
  const existingCar = await Car.findOne({ id });
  return existingCar;
};

export const Car = model<TCar, CarModel>('Car', carSchema);
