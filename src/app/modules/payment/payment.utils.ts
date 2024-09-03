import dotenv from "dotenv";
import axios from "axios";
import { TPaymentData } from "./payment.interface";

dotenv.config();

export const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
  const randomNum = Math.floor(Math.random() * 1e12).toString(36); // Generate a random number and convert to base-36
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string

  return `TX-${timestamp}-${randomNum}-${randomString}`.toUpperCase(); // Combine parts and return in uppercase
};


export const initiatePayment = async (paymentData: TPaymentData,bookingId:string) => {
  const {
    totalCost,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
  } = paymentData;
  const transactionId = generateTransactionId();
  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: transactionId,
    success_url:`http://localhost:5000/api/payment/confirmation?transactionId=${transactionId}&bookingId=${bookingId}`,
    fail_url: `http://localhost:5000/api/payment/failed?transactionId=${transactionId}&bookingId=${bookingId}`,
    cancel_url: "http://localhost:5173/",
    amount: totalCost,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: customerName,
    cus_email: customerEmail,
    cus_add1: `${
      customerAddress === "Update your address!" ? "N/A" : customerAddress
    }`,
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "N/A",
    cus_country: "Bangladesh",
    cus_phone: `${
      customerPhone === "Update your address!" ? "N/A" : customerPhone
    }`,
    type: "json",
  });
  return response.data;
};


export const verifyPayment = async (transactionId :string)=>{
  const response = await axios.get(process.env.PAYMENT_VERIFY_URL!,{
    params:{
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      request_id: transactionId,
      type: "json",
    }
  })

  return response.data;
}