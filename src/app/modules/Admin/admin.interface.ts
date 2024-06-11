import { Model, Types } from 'mongoose';


export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImg?: string;

};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
