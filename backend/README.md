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