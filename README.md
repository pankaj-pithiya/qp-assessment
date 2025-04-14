# Grocery API

## Overview
This Grocery API is built using Node.js, Express, and MikroORM. It provides a RESTful interface for managing groceries, users, and orders.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Admin Routes](#admin-routes)
  - [User Routes](#user-routes)
- [Entities](#entities)
- [Middleware](#middleware)
- [Usage](#usage)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grocery-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set the required environment variables (see below).

## Environment Variables
Make sure to set the following environment variables in your `.env` file:

```plaintext
DB_NAME=<your_database_name>      # Database name
DB_USER=<your_database_user>      # Database user
DB_PASSWORD=<your_database_password>  # Database password
DB_HOST=<your_database_host>      # Database host
DB_PORT=<your_database_port>      # Database port
JWT_SECRET=<your_jwt_secret>      # JWT secret for authentication
PORT=<your_port>                  # Port for the server
```

## API Endpoints

### Authentication
- **POST** `/auth/register`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "User Name",
      "email": "user1@example.com",
      "password": "password123",
      "role": "ADMIN"
    }
    ```
  
- **POST** `/auth/login`
  - **Description**: Log in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "user1@example.com",
      "password": "password123"
    }
    ```

### Admin Routes
These routes require admin privileges.

- **GET** `/admin/groceries`
  - **Description**: Retrieve all grocery items.
  - **Authorization**: Bearer token required.

- **POST** `/admin/groceries`
  - **Description**: Create a new grocery item.
  - **Request Body**:
    ```json
    {
      "name": "Grocery Name",
      "price": 10.0,
      "inventory": 100
    }
    ```

- **PUT** `/admin/groceries/:id`
  - **Description**: Update a grocery item by ID.
  - **Request Body**:
    ```json
    {
      "name": "Updated Name",
      "price": 12.0
    }
    ```

- **DELETE** `/admin/groceries/:id`
  - **Description**: Delete a grocery item by ID.

- **PATCH** `/admin/groceries/:id/inventory`
  - **Description**: Update inventory for a grocery item.
  - **Request Body**:
    ```json
    {
      "inventory": 50
    }
    ```

### User Routes
These routes require user authentication.

- **GET** `/user/groceries`
  - **Description**: List all available groceries.
  - **Authorization**: Bearer token required.

- **POST** `/user/orders`
  - **Description**: Create a new order.
  - **Request Body**:
    ```json
    {
      "items": [
        {
          "groceryId": 1,
          "quantity": 2
        }
      ]
    }
    ```

- **GET** `/user/orders`
  - **Description**: Retrieve all orders for the authenticated user.
  - **Authorization**: Bearer token required.

## Entities
- **User**: Represents a user in the system with roles (admin/user).
- **Grocery**: Represents grocery items with properties like name, price, and inventory.
- **Order**: Represents an order placed by a user, containing multiple order items.
- **OrderItem**: Represents individual items within an order.

## Middleware
- **Authentication Middleware**: Validates JWT tokens for protected routes.
- **Authorization Middleware**: Checks user roles for admin routes.

## Usage
1. Start the server:
   ```bash
   npm run dev
   ```
2. Use tools like Postman or curl to interact with the API endpoints.