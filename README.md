# 🍕 FoodComaApp  
*MERN Stack • Online Food Ordering Platform*

**FoodComaApp** is a full-stack food ordering platform where users can browse delicious meals, add items to cart, and place orders with ease.  
It features a modern **UI design**, **Redux Toolkit state management**, secure **authentication**, and smooth ordering flow.

---

- 🔗 **Frontend:** [foodcoma-frontend.netlify.app](https://foodcomaapp.netlify.app/)  
- 🔗 **Backend API:** [foodcoma-api.onrender.com](https://foodcomabackend.onrender.com)  
- 📦 **Frontend Repo:** [FoodComaFrontend](https://github.com/Saroj05Dev/FoodComaFrontend)  
- 📦 **Backend Repo:** [FoodComaBackend](https://github.com/Saroj05Dev/FoodComaBackend)

---

## 📑 Table of Contents
- [🛠️ Tech Stack](#tech-stack)
- [📸 Screenshots](#screenshots)
- [🚀 Features](#features)
- [📁 Project Structure](#project-structure)
- [📂 Environment Variables](#environment-variables)
- [💻 Run Locally](#run-locally)
- [🙋‍♂️ Author](#author)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

---

<a id="tech-stack"></a>
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

<a id="screenshots"></a>
## 📸 Screenshots

### 🏠 Home Page  
<img width="1891" height="865" alt="Screenshot 2025-09-23 135639" src="https://github.com/user-attachments/assets/4f1cb1a1-4a6a-4f02-a80b-81a01a78e14e" />

### 🍕 Meal Page
<img width="1914" height="838" alt="Screenshot 2025-09-23 135728" src="https://github.com/user-attachments/assets/e4f9d92a-1cb6-4c74-8224-85a4e8d33fae" />
<img width="1892" height="866" alt="Screenshot 2025-09-23 135747" src="https://github.com/user-attachments/assets/53c8355b-5e6e-490d-a276-dee163336782" />

### 🍔 Menu Page  
<img width="1894" height="860" alt="Screenshot 2025-09-23 135802" src="https://github.com/user-attachments/assets/d4ce7941-e109-4115-afc5-238ae74f4915" />

### 🛒 Cart Page  
<img width="1895" height="862" alt="Screenshot 2025-09-23 135903" src="https://github.com/user-attachments/assets/79525ff7-f432-4f89-8740-d0e48ffb412c" />

### 📦 Order Page  
<img width="1914" height="815" alt="Screenshot 2025-09-23 135918" src="https://github.com/user-attachments/assets/0acc7899-028e-440a-8f10-c69a690c0a80" />

---

<a id="features"></a>
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

<a id="project-structure"></a>
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

<a id="environment-variables"></a>

📂 Environment Variables
For Frontend
VITE_BACKEND_URL="your backend api url"

For Backend
PORT=5000
DB_URL='your mongodb url'
JWT_SECRET='your jwt secret'
CLOUDINARY_API_KEY='your cloudinary api key'
CLOUDINARY_API_SECRET='your cloudinary api secret'
CLOUDINARY_CLOUD_NAME='your cloudinary name'

<a id="run-locally"></a>

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

<a id="author"></a>
## 🙋‍♂️ Author

**Saroj Kumar Das**

- 📧 Email: [sarojkumardas.dev@gmail.com](mailto:sarojkumardas.dev@gmail.com)  
- 🔗 LinkedIn: [Saroj Kumar Das](https://www.linkedin.com/in/saroj-kumar-das-86a36b30a/)

<a id="contributing"></a>

🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to:

Fork this repository

Open issues for bugs or feature requests

Submit pull requests

<a id="license"></a>

📜 License

This project is licensed under the MIT License – free to use and modify.

⭐ If you found this project helpful, please consider giving it a star!
