# Store Rating Web Application

A fullstack web application for rating stores, built with:

- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: PostgreSQL (with Prisma ORM)
- **Styling**: Plain CSS

---

##  Features

###  User Roles
- **System Administrator**
  - Add new stores and users (admins, normal users)
  - View dashboard with user/store/rating statistics
  - Filter/search users and stores
- **Normal User**
  - Register & login
  - View all stores
  - Submit and edit ratings (1-5) for stores
- **Store Owner**
  - Login
  - View ratings given to their store
  - View average rating

---

###  Core Functionalities
- JWT-based authentication
- Password hashing (bcrypt)
- Form validations (email, password, etc.)
- Protected routes for authenticated users
- Responsive UI

---

## 🛠 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React.js            |
| Backend     | Express.js          |
| Database    | PostgreSQL + Prisma |
| Auth        | JWT, bcrypt         |
| Styling     | CSS                 |

---

##  Folder Structure

store-rating-app/
├── backend/ # Express server + Prisma + Routes
├── frontend/ # React app
├── .gitignore
├── README.md

