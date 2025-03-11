# School Management API

This project implements a set of Node.js APIs for managing school data, including adding new schools and listing them based on proximity to a user's location.

## Technologies Used

- Node.js
- Express.js
- MySQL

## API Endpoints

### 1. Add School API

- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9101
  }
  ```
- **Response:**
  ```json
  {
    "message": "School added successfully"
  }
  ```

### 2. List Schools API

- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Sample School",
      "address": "Sample Address",
      "distance": "2.5 km"
    }
  ]
  ```

## Hosting Details

- **Live API Endpoint:** [Currently under maintenance]
- **Public Domain (Railway):** `https://mysql-production-6d74.up.railway.app`

## Postman Collection

- The Postman collection includes sample requests and expected responses for all endpoints.
- [Shared via Email or Accessible via Link]

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-link>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in a `.env` file:
   ```env
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   ```
4. Start the server:
   ```bash
   npm start
   ```



