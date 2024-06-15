
[Car Rental Reservation System Backend
Live URL](https://car-rental-reservation-system-backend-blush.vercel.app/)

## Table of Contents
- Introduction
- Features
- Technology Used
- Installation
- Usage
- API Endpoints

## Introduction
The Car Rental Reservation System Backend is a robust and scalable backend solution for managing car rental reservations. This project provides RESTful API services to handle car rentals, reservations, user management, and more. It is designed to be used with a frontend application but can also be tested independently using tools like Postman.

## Features
- 🛡️ User authentication and authorization
- 🚗 CRUD operations for cars and reservations
- 📅 Real-time booking availability
- 💾 Integration with MongoDB for data persistence
- 🌐 RESTful API design for easy integration

## Technology Used
- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for data storage
- Mongoose: ODM for MongoDB and Node.js
- JWT: JSON Web Tokens for secure authentication
- Bcrypt: Library for hashing passwords
- Zod: TypeScript-first schema validation
- TypeScript

## Installation
## Follow these steps to set up the application locally.

# Step 1: Clone the Repository
Open your command prompt or terminal and run the following command to clone the repository:

- bash
- Copy code
- git clone https://github.com/Mehedihasan444/Car-Rental-Reservation-System-Backend.git
- cd Car-Rental-Reservation-System-Backend
- code .

# Step 2: Open the Terminal
- Press Ctrl + J to open the integrated terminal in Visual Studio Code.

## Step 3: Install Dependencies
Run the following command to install all the necessary dependencies:

- bash
- Copy code
- npm install

## Step 4: Start the Development Server
Start the development server with the following command:

- bash
- Copy code
- npm run start:dev
- The application should now be running on http://localhost:5000.

## Usage
Once the server is running, you can use tools like Postman to interact with the API endpoints. Make sure to check the available routes and their required parameters in the API Endpoints section.

## API Endpoints
Here's a brief overview of the main API endpoints:

### Authentication
- POST /api/auth/signup
- POST /api/auth/signin


### Cars
- POST /api/cars: Add a new car
- GET /api/cars: Get all cars
- GET /api/cars/:id : Get a car
- PUT /api/cars/:id : Update car details
- DELETE /api/cars/:id : Delete a car
- PUT /api/cars/return : return the car

### Bookings
- GET /api/bookings: Get all reservations
- POST /api/bookings: Create a new reservation
- GET /api/bookings/my-bookings  : Get reservation details
