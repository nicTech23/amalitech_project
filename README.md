# amalitech_project
Amalitech National Service Project 

# File Server Project

This project is a file server that allows users to sign up, log in, and manage files. The admin can upload files, monitor the number of downloads, and track the number of emails sent for each file. The project utilizes JavaScript, Node.js for the backend, React.js for the frontend, and MongoDB for the database.

Deploy Links:
Server: https://amalitech-project-server.onrender.com 

Client: https://amalitech-project-client.vercel.app/


## Features
- **User Authentication:** Users can sign up, verify their account, log in, and reset their password.
- **File Management:** Admin can upload files, and users can download and send files via email.
- **Tracking:** Admin can see the number of downloads and emails sent for each file.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.

## Running the Application locally 

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
   NODE_ENV=production
   
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
  POST 
  localhost: http://localhost:8000/api/v1/user_auth-route/register
  external: https://amalitech-project-server.onrender.com/api/v1/user_auth-route/register

  Required fields: `first_name`, `last_name`, `email`, `password`, `telephone`.

- **Account Verification:**
  GET 
  localhost: http://localhost:8000/api/v1/user_auth-route/verify-account/:token
  external: https://amalitech-project-server.onrender.com/api/v1/user_auth-route/:token

  params: `token`
  Token received via registering.

- **Login:**
  POST 
  localhost: http://localhost:8000/api/v1/user_auth-route/user-login
  external: https://amalitech-project-server.onrender.com/api/v1/user_auth-route/user-login

  Required fields: `email`, `password`.

- **Forgot Password:**
  POST 
  localhost: http://localhost:8000/api/v1/user_auth-route/forgot-password
  external: https://amalitech-project-server.onrender.com/api/v1/user_auth-route/forgot-password

  Required field: `email`.

- **Update Password:** 
  PUT 
  localhost: http://localhost:8000/api/v1/user_auth-route/update-password/:token
  external: https://amalitech-project-server.onrender.com/api/v1/user_auth-route/:token

  Required fields: `password`, `confirm_password`.
  params: `token` from forgot password


- **List of Files:**
  GET 
  localhost: http://localhost:8000/api/v1/document-route/get-all-files
  external: https://amalitech-project-server.onrender.com/api/v1/document-route/get-all-files

  NB: List will be find when admin has upload a file

- **Search for a File:**
  GET 
  localhost: http://localhost:8000/api/v1/document-route/search-file?search=query
  external: https://amalitech-project-server.onrender.com/api/v1/document-route/search-file?search=query

  NB: File will be find when admin has upload a file

- **Download File:**
  GET 
  localhost: http://localhost:8000/api/v1/download-route/download-file/:document_id/
  external: https://amalitech-project-server.onrender.com/api/v1/download-file/:document_id

  params: `document_id`
  

- **Send File to Email:**
  POST 
  localhost: http://localhost:8000/api/v1/message-route/send-message/:document_id
  external: https://amalitech-project-server.onrender.com/api/v1/send-message/:document_id

  params: `document_id`
  Required fields: `body`, `subject`, `recipient`(email)

### Admin Routes
- **Admin Sign Up:**
  POST 
  localhost: http://localhost:8000/api/v1/admin-route/register-admin
  external: https://amalitech-project-server.onrender.com/api/v1/admin-route/register-admin

  Required fields: `name`, `email`, `password`.

- **Admin Login:**
  POST 
  localhost: http://localhost:8000/api/v1/admin-route/admin-login
  external: https://amalitech-project-server.onrender.com/api/v1/admin-route/admin-login

  Required fields: `email`, `password`.

- **Upload File:**
  POST 
  localhost: http://localhost:8000/api/v1/document-route/create-document
  external: https://amalitech-project-server.onrender.com/api/v1/document-route/create-document
  
  Required fields: `file` (as file), `title`, `description`, `type`.

- **Get All Documents:**
  GET 
  localhost: http://localhost:8000/api/v1/document-route/get-all-files
  external: https://amalitech-project-server.onrender.com/api/v1/document-route/get-all-files

- **Number of Downloads for Each File:**
  GET 
  localhost: http://localhost:8000/api/v1/download-route/downloads-for-each-file/:document_id
  external: https://amalitech-project-server.onrender.com/api/v1/download-route/downloads-for-each-file/:document_id

  params:`document_id`

- **Number of Emails Sent for Each File:**
  GET 
  localhost: http://localhost:8000/api/v1/message-route/messages-for-each-file/:document_id
  external: https://amalitech-project-server.onrender.com/api/v1/message-route/messages-for-each-file/:document_id

  params:`document_id`


## Frontend Usage

### User Actions

- **Sign Up:**
  Navigate to:
  localhost: http://localhost:3000/user-signup
  external: https://amalitech-project-client.vercel.app/user-signup
  
  After signing up, a verification link will be sent to your email.

- **Login:**
  Navigate to:
  localhost: http://localhost:3000/user-login
  external: https://amalitech-project-client.vercel.app/user-login

  
  After logging in, you will be redirected to:
  localhost: http://localhost:3000/feeds
  external: https://amalitech-project-client.vercel.app/feeds

  Here, you can search for files, download files, and send files via email.

### Admin Actions

- **Sign Up:**
  Navigate to:
  localhost: //localhost:3000/admin-signup
  external: https://amalitech-project-client.vercel.app/admin-signup
  
- **Login:**
  Navigate to:
  localhost: http://localhost:3000/admin-login
  external: https://amalitech-project-client.vercel.app/admin-login
  
  After logging in, you will be redirected to:
  localhost: http://localhost:3000/admin-dashboard
  external: https://amalitech-project-client.vercel.app/admin-dashboard

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