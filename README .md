# 🌸 PhulBari – Flower Selling E-Commerce Website

PhulBari is a **full-stack web-based flower selling e-commerce platform** where customers can browse flowers by categories, register/login, place orders (with **Cash on Delivery** or **SSLCommerz payment gateway**), and manage their profiles. The system also provides an **admin panel** to manage flowers, categories, and orders.  

---

## ✨ Features

### 👤 Customer Features
- Register & login securely with **JWT authentication** (via Djoser).
- Browse flowers by category.
- View flower details (name, description, price, discount, stock).
- Place orders with:
  - **Cash on Delivery**
  - **SSLCommerz Payment Gateway**
- View and manage order history.
- Update user profile information.
- Place **custom orders**.
- Contact support for help.

### 🛠️ Admin Features
- Add, update, and delete flowers.
- Manage flower categories.
- View and manage customer orders.
- Control over product stock and availability.

---

## 🖥️ Tech Stack

### Backend
- **Django Rest Framework (DRF)**
- **Djoser** (for JWT authentication)
- **PostgreSQL** (primary database)
- **Supabase** (for hosting PostgreSQL)
- **SSLCommerz** (payment integration)

### Frontend
- **React.js**
- **Tailwind CSS**

### Deployment / Others
- **JWT Authentication** (secure login & session handling)
- **RESTful API** integration between frontend and backend

---

## 🔒 Security
- Authentication powered by **JWT (JSON Web Tokens)**.
- Password handling secured by **Djoser**.
- Backend endpoints protected from unauthorized access.
- Database hosted securely on **Supabase**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm/yarn
- Python 3.10+
- PostgreSQL database

### Clone the repository
```bash
git clone https://github.com/yourusername/phulbari.git
cd phulbari
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows use venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---


---

## 📂 Folder Structure
```
phulbari/
│
├── backend/       # Django Rest Framework code
│   ├── flowers/   # Flower & category app
│   ├── orders/    # Orders management
│   ├── users/     # Authentication & profiles
│   └── ...
│
├── frontend/      # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── ...
│
└── README.md
```

---

## 📬 Contact
For any inquiries or support, please reach out via the **Contact Us** page in the application.

---

## 📜 License
This project is licensed under the **MIT License** – feel free to use and modify for personal or commercial purposes.
