# URL Shortener

## Overview

URL Shortener is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to convert long URLs into shorter, more manageable links. When a user accesses a shortened URL, they are automatically redirected to the original destination.

In addition to URL shortening, the application provides click analytics, allowing users to track how many times a shortened link has been accessed. A dashboard is also included to manage and monitor all generated URLs.

This project was developed to understand and implement real-world concepts such as REST APIs, database management, URL redirection, frontend-backend communication, analytics tracking, and full-stack deployment workflows.

---

## Features

### URL Shortening

Users can enter a long URL and generate a unique short URL.

Example:

Original URL:

```text
https://www.google.com/search?q=mern+stack+projects
```

Generated Short URL:

```text
http://localhost:5000/aB12X
```

---

### URL Redirection

When a user visits the generated short URL, the application automatically redirects them to the original URL.

Example:

```text
http://localhost:5000/aB12X
```

Redirects to:

```text
https://www.google.com/search?q=mern+stack+projects
```

---

### Click Analytics

The application tracks the number of times a shortened URL has been visited.

Each successful redirection increases the click count stored in the database.

---

### URL Validation

Before creating a short URL, the application validates the submitted URL to ensure that invalid links are not stored in the database.

Examples:

Valid:

```text
https://google.com
https://github.com
http://localhost:3000
```

Invalid:

```text
hello
google
abcd123
```

---

### Dashboard

The dashboard displays all generated URLs along with their details.

Information displayed:

* Original URL
* Short Code
* Number of Clicks
* Creation Date (optional enhancement)

---

### Delete URLs

Users can remove unwanted URLs from the database directly through the dashboard.

---

### Copy Short URL

Generated short URLs can be copied to the clipboard using a single click.

---

## Technology Stack

### Frontend

* React.js
* Axios
* HTML
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Libraries and Packages

#### Backend

* nanoid
* validator
* mongoose
* cors
* dotenv
* nodemon

#### Frontend

* axios

---

## System Architecture

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP Requests (Axios)
 ▼
Express API Server
 │
 ▼
MongoDB Database
 │
 ▼
Stored URLs and Analytics
```

---

## Project Structure

```text
url-shortner/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── urlController.js
│   │
│   ├── models/
│   │   └── Url.js
│   │
│   ├── routes/
│   │   └── urlRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Database Schema

### URL Collection

```javascript
{
  originalUrl: String,
  shortCode: String,
  clicks: Number,
  createdAt: Date
}
```

### Field Description

| Field       | Description                        |
| ----------- | ---------------------------------- |
| originalUrl | Stores the original long URL       |
| shortCode   | Unique code generated using NanoID |
| clicks      | Tracks the number of visits        |
| createdAt   | Timestamp of creation              |

---

## API Documentation

### Create Short URL

**Endpoint**

```http
POST /api/url/shorten
```

**Request Body**

```json
{
  "url": "https://www.google.com"
}
```

**Response**

```json
{
  "shortCode": "aB12X"
}
```

---

### Redirect URL

**Endpoint**

```http
GET /:shortCode
```

**Example**

```http
GET /aB12X
```

The user is redirected to the original URL.

---

### Get Analytics

**Endpoint**

```http
GET /api/url/analytics/:shortCode
```

**Response**

```json
{
  "originalUrl": "https://www.google.com",
  "shortCode": "aB12X",
  "clicks": 15,
  "createdAt": "2025-06-19T12:00:00.000Z"
}
```

---

### Get All URLs

**Endpoint**

```http
GET /api/url
```

**Response**

```json
[
  {
    "_id": "6853abc123",
    "originalUrl": "https://google.com",
    "shortCode": "aB12X",
    "clicks": 15
  }
]
```

---

### Delete URL

**Endpoint**

```http
DELETE /api/url/:id
```

**Response**

```json
{
  "message": "URL deleted successfully"
}
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/muralidanda0/url-shortner.git
cd url-shortner
```

---

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

The backend server will run on:

```text
http://localhost:5000
```

---

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will run on:

```text
http://localhost:5173
```

---

## Testing

The application can be tested using:

* Browser
* Postman
* MongoDB Compass

Testing scenarios:

1. Create a short URL.
2. Verify database insertion.
3. Open the generated short URL.
4. Verify redirection.
5. Verify click count increments.
6. Delete a URL.
7. Verify database removal.

---

## Challenges Faced During Development

* Establishing a secure MongoDB Atlas connection.
* Handling CORS between frontend and backend.
* Implementing dynamic URL redirection.
* Managing React state updates after URL creation and deletion.
* Validating user input before database insertion.
* Designing a scalable API structure.

---

## Future Enhancements

The following features can be added to further improve the application:

* Custom URL aliases
* QR Code generation
* User authentication and authorization
* Advanced analytics dashboard
* Search and filtering
* URL expiration dates
* Password-protected URLs
* Responsive UI using Tailwind CSS
* Dark mode
* Deployment using Render and Vercel

---

## Learning Outcomes

This project helped strengthen understanding of:

* MERN Stack development
* RESTful API design
* MongoDB CRUD operations
* Express middleware
* React Hooks
* Axios integration
* URL redirection mechanisms
* Analytics tracking
* Git and GitHub workflows
* Full-stack application architecture

---

## Author

Murali Danda

GitHub Repository:

https://github.com/muralidanda0/url-shortner
