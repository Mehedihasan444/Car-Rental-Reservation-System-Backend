
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";
import { Request, Response } from "express";

const makePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.makePayment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment in progress.",
    data: result,
  });
});

const paymentConfirmation = async (req: Request, res: Response) => {
  const transactionId = req.query.transactionId as string;
  const bookingId = req.query.bookingId as string;

  await PaymentServices.paymentConfirmation({
    transactionId,
    bookingId,
  });

  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
          }
          .container {
            text-align: center;
            padding: 50px;
            background: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          h1 {
            color: #4CAF50;
            font-size: 2.5em;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.2em;
            color: #555555;
            margin-bottom: 30px;
          }
          .button {
            background-color: #4CAF50;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1.1em;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Success</h1>
          <p>Thank you for your payment! Your transaction has been successfully completed.</p>
          <a href="https://car-rental-reservation-system-frontend-tau.vercel.app/" class="button">Go to Home</a>
        </div>
      </body>
    </html>
  `);
};

const paymentFailed = async (req: Request, res: Response) => {

  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
          }
          .container {
            text-align: center;
            padding: 50px;
            background: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }
          h1 {
            color: #E74C3C;
            font-size: 2.5em;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.2em;
            color: #555555;
            margin-bottom: 30px;
          }
          .button {
            background-color: #E74C3C;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1.1em;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #C0392B;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Payment Failed</h1>
          <p>We're sorry, but your payment could not be processed. Please try again.</p>
          <a href="https://car-rental-reservation-system-frontend-tau.vercel.app/dashboard/user/payment-management" class="button">Retry Payment</a>
        </div>
      </body>
    </html>
  `);
};

export const paymentControllers = {
  makePayment,
  paymentConfirmation,
  paymentFailed,
};
