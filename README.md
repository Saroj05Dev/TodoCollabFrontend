# 🍕 FoodComaApp  
*MERN Stack • Online Food Ordering Platform*

**FoodComaApp** is a full-stack food ordering platform where users can browse delicious meals, add items to cart, and place orders with ease.  
It features a modern **UI design**, **Redux Toolkit state management**, secure **authentication**, and smooth ordering flow.

---

- 🔗 **Frontend:** [foodcoma-frontend.vercel.app](#)  
- 🔗 **Backend API:** [foodcoma-api.onrender.com](#)  
- 📦 **Frontend Repo:** [FoodComaFrontend](#)  
- 📦 **Backend Repo:** [FoodComaBackend](#)

---

## 📑 Table of Contents
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Features](#-features)
- [📁 Project Structure](#-project-structure)
- [📂 Environment Variables](#-environment-variables)
- [💻 Run Locally](#-run-locally)
- [🙋‍♂️ Author](#️-author)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🛠️ Tech Stack

| Layer        | Technologies                           |
|--------------|----------------------------------------|
| **Frontend** | React, Redux Toolkit, Tailwind CSS     |
| **Backend**  | Node.js, Express.js, MongoDB           |
| **API Calls**| Axios + Redux AsyncThunk               |
| **Auth**     | JWT-based Authentication               |
| **Images**   | Cloudinary                             |
| **Toast**    | React Hot Toast                        |

---

## 📸 Screenshots

### 🏠 Home Page  
<img src="https://github.com/user-attachments/assets/your-homepage-img" width="800"/>

### 🍔 Menu Page  
<img src="https://github.com/user-attachments/assets/your-menu-img" width="800"/>

### 🛒 Cart Page  
<img src="https://github.com/user-attachments/assets/your-cart-img" width="800"/>

### 📦 Order Page  
<img src="https://github.com/user-attachments/assets/your-order-img" width="800"/>

---

## 🚀 Features

### 👤 User Features
- 🔐 Register & Login with JWT authentication  
- 🍽️ Browse food categories & items  
- 🛒 Add to Cart, remove items  
- 💳 Place orders seamlessly  

### 👨‍💼 Admin Features
- 🧾 Add/update/delete food items  
- 📦 Manage orders & track status  
- 📊 Dashboard to view app activity  

### 💡 Additional Features
- 📤 Upload food images to **Cloudinary**  
- 🔔 Real-time notifications with **React Hot Toastify**  
- 🧭 Pagination for menu browsing  
- 🧑‍⚖️ Role-based route protection (User/Admin)  

---

## 📁 Project Structure

```bash
├── FoodComaFrontend/         # React Frontend
│   ├── src/
│   ├── public/
│   └── .env
│
├── FoodComaBackend/          # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── schemas/
│   └── .env
│
├── README.md
└── package.json

For Frontend
VITE_BACKEND_URL="your backend api url"

For Backend

PORT=5000
DB_URL='your mongodb url'
JWT_SECRET='your jwt secret'
CLOUDINARY_API_KEY='your cloudinary api key'
CLOUDINARY_API_SECRET='your cloudinary api secret'
CLOUDINARY_CLOUD_NAME='your cloudinary name'

💻 Run Locally
Clone and Setup Frontend

git clone https://github.com/Saroj05Dev/FoodComaFrontend.git
cd FoodComaFrontend
npm install
npm run dev

Clone and Setup Backend
git clone https://github.com/Saroj05Dev/FoodComaBackend.git
cd FoodComaBackend
npm install
npm start

🙋‍♂️ Author

Saroj Kumar Das

📧 Email: sarojkumardas.dev@gmail.com

🔗 LinkedIn: Saroj Kumar Das

🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to:

Fork this repository

Open issues for bugs or feature requests

Submit pull requests

📜 License

This project is licensed under the MIT License – free to use and modify.

⭐ If you found this project helpful, please consider giving it a star!
