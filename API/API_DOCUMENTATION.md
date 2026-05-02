# Medical Application API Documentation

This document provides a high-level overview of the API.

> 🚀 **Interactive Documentation**
> For full endpoint details, request/response schemas, and an interactive test client, start the server with `NODE_ENV=development` (the default) and visit the [Scalar API Reference UI](http://localhost:3000/docs).
>
> The raw OpenAPI 3.0 specification can be fetched at `http://localhost:3000/openapi.json`.

## Base URL

All API endpoints are prefixed with `/api` unless stated otherwise.
The server runs on `http://localhost:<PORT>` (default is 3000).

---

## 1. Authentication Endpoints

These endpoints handle OAuth logins with Google and Facebook using Passport.js. Successful authentication returns a JWT token.

### 1.1 Initiate Google Login

- **Method:** `GET`
- **Endpoint:** `/api/auth/google`
- **Description:** Redirects the user to the Google OAuth consent screen. Requests `profile` and `email` scopes.

### 1.2 Google Callback

- **Method:** `GET`
- **Endpoint:** `/api/auth/google/callback`
- **Description:** The callback URL for Google OAuth. On failure, redirects to `/login`.
- **Response:** (JSON)
  ```json
  {
    "message": "Google login successful",
    "token": "<JWT_TOKEN>",
    "user": { "id": "...", "email": "...", "role": "CLIENT", ... }
  }
  ```

### 1.3 Initiate Facebook Login

- **Method:** `GET`
- **Endpoint:** `/api/auth/facebook`
- **Description:** Redirects the user to the Facebook OAuth consent screen. Requests `email` scope.

### 1.4 Facebook Callback

- **Method:** `GET`
- **Endpoint:** `/api/auth/facebook/callback`
- **Description:** The callback URL for Facebook OAuth. On failure, redirects to `/login`.
- **Response:** (JSON)
  ```json
  {
    "message": "Facebook login successful",
    "token": "<JWT_TOKEN>",
    "user": { "id": "...", "email": "...", "role": "CLIENT", ... }
  }
  ```

---

## 2. Reservation Endpoints

These endpoints manage medical reservations.

### 2.1 Create a Reservation

- **Method:** `POST`
- **Endpoint:** `/api/reservations/`
- **Description:** Creates a new reservation for a patient.
- **Authentication:** Not explicitly required at the router level (based on `reservations-routes.js`, though typically patients should be logged in).
- **Request Body:** Must comply with `createReservationSchema`. Based on the database schema, expects:
  ```json
  {
    "patientName": "String",
    "age": "Number",
    "egyptianMobileNumber": "String",
    "locationUrl": "String (Optional)",
    "reservationDate": "ISO-8601 DateTime",
    "service": "CONSULTATION | SURGERY | EXAMINATION | THERAPY",
    "userId": "UUID"
  }
  ```
- **Response (201 Created):** Returns the created reservation object.
- **Response (400 Bad Request):** Validation error message.

### 2.2 Get All Reservations

- **Method:** `GET`
- **Endpoint:** `/api/reservations/`
- **Description:** Retrieves a paginated list of reservations.
- **Authentication:** Required (Bearer Token).
- **Authorization:** `SUPER_ADMIN` or `ADMIN`.
- **Query Parameters (Optional):**
  - `page`: Page number
  - `limit`: Number of items per page
  - `startDate`: Filter reservations from this date
  - `endDate`: Filter reservations up to this date
- **Response (200 OK):** Returns a list/paginated object of reservations.

### 2.3 Get My Assigned Reservations

- **Method:** `GET`
- **Endpoint:** `/api/reservations/my-assigned`
- **Description:** Retrieves a paginated list of reservations assigned to the currently authenticated administrator.
- **Authentication:** Required (Bearer Token).
- **Authorization:** `ADMIN`.
- **Query Parameters (Optional):**
  - `page`: Page number
  - `limit`: Number of items per page
  - `startDate`: Filter reservations from this date
  - `endDate`: Filter reservations up to this date
- **Response (200 OK):** Returns a list/paginated object of reservations assigned to the user's ID.

---

## 3. User Endpoints

These endpoints manage user data and administration.

_Note: Since the router is mounted on `/api/users` and the paths inside the router correspond to `/users` and `/users/admin`, the resulting endpoints are nested._

### 3.1 Get All Users

- **Method:** `GET`
- **Endpoint:** `/api/users/users`
- **Description:** Retrieves all users in the system.
- **Authentication:** Not explicitly defined in this route (though typically should be restricted).
- **Response (200 OK):** Returns an array of user objects.

### 3.2 Create an Admin User

- **Method:** `POST`
- **Endpoint:** `/api/users/users/admin`
- **Description:** Creates a new user and assigns them the `ADMIN` role.
- **Authentication:** Required (Bearer Token).
- **Authorization:** `SUPER_ADMIN`.
- **Request Body:** Must comply with `createUserSchema` (expects data like nested name, email, password, etc.).
- **Response (201 Created):** Returns the created admin user object.
- **Response (400 Bad Request):** Validation error message.

---

## 4. General Endpoints

### 4.1 Health Check

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Basic endpoint to verify the server is running.
- **Response:** Simple text string `"Hello World!"`.

---

## Security & Enums

### Roles

- `SUPER_ADMIN`
- `ADMIN`
- `CLIENT` (Default)

### Medical Services

- `CONSULTATION`
- `SURGERY`
- `EXAMINATION`
- `THERAPY`

### Reservation Statuses

- `PENDING` (Default)
- `APPROVED`
- `COMPLETED`
- `REJECTED`
