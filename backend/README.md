# UBER AUTO Backend Documentation

## User Registration Endpoint

### Endpoint
`POST /user/register`

### Description
This endpoint allows a new user to register by providing their details. It validates the input data, hashes the password, and creates a new user in the database.

### Required Data
The request body must be in JSON format and include the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the user's first name (minimum 3 characters).
  - `lastName`: A string representing the user's last name (optional, minimum 3 characters).
- `email`: A string representing the user's email address (must be a valid email format and unique).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Example Response
- **Success (201 Created)**: Returns a JSON object containing the authentication token and user details.
  - Example Response:
  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with error details.
  - Example Response:
  ```json
  {
    "errors": [
      {
        "msg": "FirstName must be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      }
    ]
  }
  ```

### Status Codes
- `201`: User successfully registered.
- `400`: Validation errors occurred.


## User Login Endpoint

### Endpoint
`POST /user/login`

### Description
This endpoint allows an existing user to log in by providing their email and password. It validates the input data, checks the credentials, and returns an authentication token if successful.

### Required Data
The request body must be in JSON format and include the following fields:

- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

### Example Response
- **Success (200 OK)**: Returns a JSON object containing the authentication token and user details.
  - Example Response:
  ```json
  {
    "token": "your_jwt_token",
    "user": {
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails, returns a JSON object with error details.
  - Example Response:
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

- **Error (401 Unauthorized)**: If the email or password is incorrect, returns an error message.
  - Example Response:
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Status Codes
- `200`: User successfully logged in.
- `400`: Validation errors occurred.
- `401`: Invalid email or password.


## User Profile Endpoint

### Endpoint
`GET /user/profile`

### Description
This endpoint retrieves the profile of the currently authenticated user.

### Required Data
No request body is required. The token must be provided in the `Authorization` header or as a cookie.

### Example Request
#### Using Authorization Header:
```
GET /user/profile
Authorization: Bearer your_jwt_token
```

#### Using Cookie:
```
GET /user/profile
Cookie: token=your_jwt_token
```

### Example Response
- **Success (200 OK)**: Returns a JSON object containing the user's profile details.
  - Example Response:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **Error (401 Unauthorized)**: If the token is missing, invalid, or blacklisted, returns an error message.
  - Example Response:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes
- `200`: User profile retrieved successfully.
- `401`: Unauthorized (token missing, invalid, or blacklisted).

## User Logout Endpoint

### Endpoint
`GET /user/logout`

### Description
This endpoint logs out the currently authenticated user by blacklisting their authentication token and clearing the token cookie.

### Required Data
No request body is required. The token must be provided in the `Authorization` header or as a cookie.

### Example Request
#### Using Authorization Header:
```
GET /user/logout
Authorization: Bearer your_jwt_token
```

#### Using Cookie:
```
GET /user/logout
Cookie: token=your_jwt_token
```

### Example Response
- **Success (200 OK)**: Returns a success message indicating the user has been logged out.
  - Example Response:
  ```json
  {
    "message": "Logout successful"
  }
  ```

- **Error (401 Unauthorized)**: If the token is missing, invalid, or blacklisted, returns an error message.
  - Example Response:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

### Status Codes
- `200`: Logout successful.
- `401`: Unauthorized (token missing, invalid, or blacklisted).


# UBER AUTO Backend Documentation

## Captain Registration Endpoint

### Endpoint
`POST /captain/register`

### Description
This endpoint allows a new captain to register by providing their details and vehicle information. It validates the input data, hashes the password, and creates a new captain in the database.

### Required Data
The request body must be in JSON format and include the following fields:

- `fullName`: An object containing:
  - `firstName`: A string representing the captain's first name (minimum 3 characters).
  - `lastName`: A string representing the captain's last name (minimum 3 characters).
- `email`: A string representing the captain's email address (must be a valid email format and unique).
- `password`: A string representing the captain's password (minimum 6 characters).
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color (required).
  - `plate`: A string representing the vehicle's plate number (required).
  - `capacity`: A number representing the vehicle's capacity (minimum 1).
  - `vehicleType`: A string representing the type of vehicle (must be one of `car`, `bike`, or `auto`).

### Example Request
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
- **Success (201 Created)**: Returns a JSON object containing the authentication token and captain details.
  - Example Response:
  ```json
  {
    "token": "your_jwt_token",
    "captain": {
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (400 Bad Request)**: If validation fails or the captain already exists, returns a JSON object with error details.
  - Example Response:
  ```json
  {
    "message": "Captain already exists"
  }
  ```

### Status Codes
- `201`: Captain successfully registered.
- `400`: Validation errors occurred or captain already exists.