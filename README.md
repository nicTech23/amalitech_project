# amalitech_project
Amalitech National Service Project 

# File Server Project

This project is a file server that allows users to sign up, log in, and manage files. The admin can upload files, monitor the number of downloads, and track the number of emails sent for each file. The project utilizes JavaScript, Node.js for the backend, React.js for the frontend, and MongoDB for the database.


## Features
- **User Authentication:** Users can sign up, verify their account, log in, and reset their password.
- **File Management:** Admin can upload files, and users can download and send files via email.
- **Tracking:** Admin can see the number of downloads and emails sent for each file.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.

## Running the Application

The root directory contains two folders: `backend` and `client`.

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a `.env` file at the root of the backend folder and add the following environment variables:
   PORT=<port number>
   SECRET_KEY=<secret key>
   MONGODB_URL=<mongodb url>
   
3. Install the necessary packages:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Client

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm start
   ```

## Backend Testing with Postman or Thunder Client

### User Routes

- **Sign Up:**
  POST /api/v1/user_auth-route/register

  Required fields: `first_name`, `last_name`, `email`, `password`, `telephone`.

- **Account Verification:**
  GET /api/v1/user_auth-route/verify-account/:token
  params: `token`
  Token received via registering.

- **Login:**
  POST /api/v1/user_auth-route/user-login

  Required fields: `email`, `password`.

- **Forgot Password:**
  POST /api/v1/user_auth-route/forgot-password
  Required field: `email`.

- **Update Password:**
  PUT /api/v1/user_auth-route/update-password/:token
  Required fields: `password`, `confirm_password`.
  params: `token` from forgot password


- **List of Files:**
  GET /api/v1/document-route/get-all-files

  NB: List will be found when admin has upload a file

- **Search for a File:**
  GET /api/v1/document-route/search-file?search=query

  NB: File will be found when admin has upload a file

- **Download File:**
  GET /api/v1/download-route/download-file/:document_id/:file_name 

  params: `document_id`, `file_name`
  The document_id, and the file_name must be from one document
  NB: file can be  Download when admin has added a file

- **Send File to Email:**
  POST /api/v1/message-route/send-message/:document_id
  params: `document_id`
  Required fields: `body`, `subject`, `recipient`(email), `file_name`.

### Admin Routes
- **Admin Sign Up:**
  POST /api/v1/admin-route/register-admin
  Required fields: `name`, `email`, `password`.

- **Admin Login:**
  POST /api/v1/admin-route/admin-login
  Required fields: `email`, `password`.

- **Upload File:**
  POST /api/v1/document-route/create-document
  Required fields: `file` (as file), `title`, `description`, `type`.

- **Get All Documents:**
  GET /api/v1/document-route/get-all-files

- **Number of Downloads for Each File:**
  GET /api/v1/download-route/downloads-for-each-file/:document_id
  params:`document_id`

- **Number of Emails Sent for Each File:**
  GET /api/v1/message-route/messages-for-each-file/:document_id
  params:`document_id`


## Frontend Usage

### User Actions

- **Sign Up:**
  Navigate to:
  http://localhost:3000/user-signup
  
  After signing up, a verification link will be sent to your email.

- **Login:**
  Navigate to:
  http://localhost:3000/user-login
  
  After logging in, you will be redirected to:
  http://localhost:3000/feeds

  Here, you can search for files, download files, and send files via email.

### Admin Actions

- **Sign Up:**
  Navigate to:
  http://localhost:3000/admin-signup
  
- **Login:**
  Navigate to:
  http://localhost:3000/admin-login
  
  After logging in, you will be redirected to:
  http://localhost:3000/admin-dashboard
  Here, you can upload files, and see the number of downloads and emails sent for each file.

## Environment Variables

Create a `.env` file in the backend folder and include the following variables:

```plaintext
PORT=<port number>
SECRET_KEY=<secret key>
EMAIL=<email>
MONGODB_URL=<mongodb url>
```

This README provides an overview of the file server project, instructions on setting it up, and guidance on how to use its features. For more detailed information, refer to the project's codebase.

ER Diagram database link: https://drive.google.com/file/d/1Ni5CyCjPAPs156bYUsirvPSbRRIpJnJm/view?usp=sharing