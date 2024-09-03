export type TPayment = {
  _id: string;
  date: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  };
  car: {
    _id: string;
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: "available" | "unavailable";
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
    images: string[];
    type: string;
    brand: string;
    model: string;
    fuelType: string;
    transmission: string;
    seatingCapacity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  startTime: string;
  endTime: string | null;
  totalCost: number;
  payment: string;
  isBooked: "unconfirmed" | "confirmed" | "canceled" | "returned";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPaymentData = {
  totalCost: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
};
