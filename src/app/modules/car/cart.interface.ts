import { Model } from "mongoose";

export interface TCar{
    id: string;
    name: string;
    description:string;
    color:string;
    isElectric:boolean;
    status:'available'|'unavailable';
    features: Array<string>;
    pricePerHour:number;
    isDeleted:boolean;
}

export interface CarModel extends Model<TCar> {
    //instance methods for checking if the user exist
    isUserExistsByCustomId(id: string): Promise<TCar>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number,
    ): boolean;
  }
  

  