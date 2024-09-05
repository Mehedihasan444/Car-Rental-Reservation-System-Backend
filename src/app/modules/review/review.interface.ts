import { Types } from "mongoose";

export type TReview={
    car:Types.ObjectId;
    name: string;
    email: string;
    rating: number;
    comment: string;
    isDeleted?:boolean
}
