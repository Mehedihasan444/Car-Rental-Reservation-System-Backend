import { Booking } from "../booking/booking.model";
import { TPayment } from "./payment.interface";
import { initiatePayment, verifyPayment } from "./payment.utils";

const makePayment = async (payload: TPayment) => {
  const bookingId = payload._id;
  const paymentData = {
    totalCost: payload?.totalCost,
    customerName: payload?.user?.name,
    customerEmail: payload?.user?.email,
    customerPhone: payload?.user?.phone,
    customerAddress: payload?.user?.address,
  };
  const paymentSession = await initiatePayment(paymentData, bookingId);

  return paymentSession;
};

const paymentConfirmation = async ({
  transactionId,
  bookingId,
}: {
  transactionId: string;
  bookingId: string;
}) => {
let booking
   const verifyResponse =  await verifyPayment(transactionId)
   if (verifyResponse&&verifyResponse.pay_status === 'Successful') {
    
        booking = await Booking.findByIdAndUpdate(
         bookingId,
         {
           $set: {
             payment: "paid",
             transactionId : transactionId,
           },
         },
         { new: true }
       );
   }

  return booking;
};


export const PaymentServices = {
  makePayment,
  paymentConfirmation,

};
