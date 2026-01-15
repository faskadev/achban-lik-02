📄 Achban-Lik – Project Requirements Document (Cahier des Charges)

1️⃣ Project Title

Achban-Lik – Restaurant Review Mobile Application

Type: Educational / Training Project

Platform: Mobile (React Native with Expo)

Backend: Node.js + Express + Sequelize

Database: SQLite (training purpose)

2️⃣ Project Overview

Achban-Lik is a mobile application that allows users to browse restaurants, read reviews, and share their dining experiences. Admins manage restaurant information, while users can submit one review per restaurant.

Educational Purpose:

The project is designed for training and learning.

Emphasis on beginner-friendly code, clean architecture, and understanding full-stack mobile app development.

3️⃣ Objectives

Learn React Native with Expo

Implement navigation using Expo Router

Understand state management (Zustand + React Query)

Implement backend with MVC architecture

Manage database relations with Sequelize ORM

Implement authentication and authorization (JWT tokens)

Perform CRUD operations for restaurants and reviews

Seed demo data for testing

4️⃣ Functional Requirements
4.1 User Features

Register / login

Browse restaurant listings

View detailed restaurant information

Add review (only one per restaurant)

Edit or delete own review

View all personal reviews in a My Reviews screen

Filter restaurants by city

See aggregated ratings

4.2 Admin Features

Login as admin

Perform all user actions

Add new restaurants

Edit restaurant information

Delete restaurants

Upload restaurant image (only one per restaurant)

5️⃣ Non-Functional Requirements

Simple and beginner-friendly code

Mobile responsive design

Offline mode is not required

Lightweight and easy to deploy

Basic error handling and validation

Educational focus, no production-level optimization required

6️⃣ User Roles & Permissions
Role	Permissions
User	Browse restaurants, add/edit/delete own reviews, view My Reviews
Admin	All user permissions + manage restaurants (add/edit/delete, upload image)

Authentication: JWT tokens + AsyncStorage for session persistence

Authorization: Backend middleware enforces role-based access

7️⃣ Application Screens
Screen	Description
Splash Screen	Shows logo, redirects to auth choice
Auth Choice	Login / Register buttons
Register Screen	User details: name, email, password, confirm password
Login Screen	Email and password fields
Restaurants List Screen	Card list of restaurants (name, image, short desc, rating, number of reviews) + filters
Restaurant Details Screen	Full info, reviews, add/edit/delete review options
Add/Edit Review Screen	Form for adding or editing a review
My Reviews Screen	Lists all reviews by logged-in user, editable/deletable
Admin Restaurants Screen	Add/edit/delete restaurants, upload images (admin only)
Add/Edit Restaurant Screen	Form for restaurant details including name, description, city, coordinates, main image
8️⃣ Business Rules

Each restaurant may have multiple reviews

Each user can add only one review per restaurant

Users can edit or delete their own reviews

Database enforces uniqueness with (user_id, restaurant_id)

9️⃣ Database Models
9.1 User

id, name, email, password (hashed), role (user/admin)

One-to-many relationship with Review

9.2 Restaurant

id, name, shortDescription, longDescription, address, city, latitude, longitude, mainImage

One-to-many relationship with Review

9.3 Review

id, rating (1–5), comment, visitDate, userId, restaurantId

Unique constraint: (userId, restaurantId)

10️⃣ Navigation Logic

Handled with Expo Router

_layout.jsx defines public and protected routes:

Public: login, register

Protected: restaurants, reviews

Stack navigation for simplicity

Redirects based on authentication state

11️⃣ Data Validation Rules

Email must be valid

Password minimum length 6 characters

Review rating between 1–5

Review comment required

Restaurant name, city, address required

Main image required

12️⃣ API Contract
Authentication

POST /auth/register – register new user

POST /auth/login – login user

Restaurants

GET /restaurants – list all

GET /restaurants/:id – restaurant details

POST /restaurants – create (admin only)

PUT /restaurants/:id – update (admin only)

DELETE /restaurants/:id – delete (admin only)

Reviews

GET /reviews/me – list user's reviews

POST /reviews – create review

PUT /reviews/:id – update review

DELETE /reviews/:id – delete review

13️⃣ Image Handling Strategy

One main image per restaurant

Uploaded using multipart/form-data

Stored in backend folder: backend/uploads/restaurants/

API returns filename/URL to frontend

14️⃣ Seeds & Demo Data

Admin account pre-created

20 restaurants seeded with all details (name, description, city, coordinates, main image)

Users pre-created for testing reviews

Seeders automate populating database

15️⃣ Deliverables

Mobile app (React Native + Expo)

Backend API (Express + Sequelize)

Database with seeded data

Source code structured for beginner learning

16️⃣ Security Features

Password hashing (bcrypt)

JWT-based authentication

Role-based access control for protected routes

Input validation on backend

17️⃣ Conclusion

Achban-Lik is a beginner-friendly project demonstrating:

Mobile development fundamentals

Backend API integration

Authentication and role-based permissions

Database modeling and constraints

MVC architecture

Full-stack integration in a simple, educational format

✅ Ready for implementation, testing, and presentation in a training environment.