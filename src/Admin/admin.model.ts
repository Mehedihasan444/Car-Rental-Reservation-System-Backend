import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';



const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [20, 'Name can not be more than 20 characters'],
      trim: true,
     
    },
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: { type: String, required: [true, 'Contact number is required'] },
  address: {
      type: String,
      required: [true, 'Present address is required'],
    },
  
    profileImg: { type: String },

  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);



// filter out deleted documents
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
