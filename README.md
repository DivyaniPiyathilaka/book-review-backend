# Book Review Application

The **Book Review Application** is a web-based platform built using React.js, Node.js, and MySQL, where users can write and manage book reviews. It provides separate functionalities for regular users and administrators, enabling a streamlined review approval system.

## Features

### User Functionality

- **Register/Login:** Users can create an account or log in to an existing one.
- **Add Reviews:** Submit book reviews with ease.
- **Edit/Delete Reviews:** Modify or remove previously submitted reviews.
- **View Approved Reviews:** Browse the feed of reviews approved by the admin.

### Admin Functionality

- **Approve/Reject Reviews:** Moderate user-submitted reviews to ensure quality and relevance.
- **Display Approved Reviews:** Approved reviews are published in the user feed.

## Getting Started

### Prerequisites

- **Node.js** and **npm**  installed on your machine.
- **MySQL** database setup.

### Installation

1. Clone the repositories:
   - **Frontend:**
     ```bash
     git clone https://github.com/DivyaniPiyathilaka/book-review-frontend.git
     cd book-review-frontend
     ```
   - **Backend:**
     ```bash
     git clone https://github.com/DivyaniPiyathilaka/book-review-backend.git
     cd book-review-backend
     ```
2. Install dependencies:
   - For the backend:
     ```bash
     cd book-review-backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd book-review-frontend
     npm install
     ```
3. Configure environment variables:
   - In the `book-review-backend` folder, create a `.env` file and include:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=root
     DB_NAME=book_review
     DB_DIALECT=mysql
     JWT_SECRET=R&h7!8R2aJt3J8Kv6P0!bWm9ZzP8@YrA
     ```
4. Run the application:
   - Start the backend:
     ```bash
     cd book-review-backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd book-review-frontend
     npm start
     ```

### Default Accounts

- **User Account:**
  - **Email:** `user@gmail.com`
  - **Password:** `123456789`
- **Admin Account:**
  - **Email:** `admin@gmail.com`
  - **Password:** `123456789`

### Creating a New Account

You can create new accounts by visiting: [http://localhost:3000/register](http://localhost:3000/register).


## Technologies Used

- **Frontend:**
  - React.js
  
- **Backend:**
  - Node.js
  
- **Database:**
  - MySQL
- **Authentication:**
  - JWT (JSON Web Token)

## License

This project is licensed under the MIT License.

---

Start sharing and exploring book reviews today!
