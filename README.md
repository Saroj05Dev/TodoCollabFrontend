# TodoCollab  
*MERN Stack • Real-Time Collaborative To-Do Application*

**TodoCollab** is a full-stack application for teams to manage tasks collaboratively in real-time.  
Users can create tasks, assign them to team members, track activity, add comments/files, and handle task conflicts seamlessly.

---

## 🌐 Live Demo

- Frontend: [Deployed Link](https://todo-collab-frontend-nm629s5kn-saroj-kumar-das-projects.vercel.app)  
- Backend API: [Deployed Link](https://todobaord.onrender.com)  
- Frontend Repo: [TodoCollabFrontend](https://github.com/Saroj05Dev/TodoCollabFrontend)  
- Backend Repo: [TodoCollabBackend](https://github.com/Saroj05Dev/TodoBaord)

---

## 📑 Table of Contents
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Run Locally](#run-locally)
- [Author](#author)
- [Contributing](#contributing)
- [License](#license)
---

## Tech Stack

| Layer        | Technologies                                        |
|--------------|-----------------------------------------------------|
| Frontend     | React.js, Redux Toolkit, Tailwind CSS, React Router |
| Backend      | Node.js, Express.js                                 |
| Database     | MongoDB (Mongoose)                                  |
| Real-Time    | Socket.IO                                           |
| Auth         | JWT                                                 |
| Icons        | React Lucide Icons                                  |
| File Uploads | Cloudinary                                          |
| Notifications| React Hot Toast                                     |

---

## Screenshots

### Dashboard  
<img width="1920" alt="Dashboard" src="https://github.com/user-attachments/assets/1ceeed1c-c73f-4772-ac4f-105115abc74a" />
<img width="1920" alt="Dashboard 2" src="https://github.com/user-attachments/assets/6c538c4c-02b7-4b9b-bd8d-f72288e575f9" />  
*Main dashboard with Kanban board and activity log.*

### Task Details  
<img width="1920" alt="Task Modal" src="https://github.com/user-attachments/assets/9d311afd-3ede-4abc-afb6-e211c6bf85e4" />
<img width="1920" alt="Task Modal 2" src="https://github.com/user-attachments/assets/68e3c43c-b563-48d4-ad25-debf0560c4af" />  
*View/edit tasks, add subtasks, comments, and files.*

### Activity Log Page 
<img width="1920" alt="Activity Log" src="https://github.com/user-attachments/assets/7d4a5389-6ae5-40b1-aefb-ffbe4596b694" />  
*Activity log shows last 20 actions performed by users.*

---

## 🚀 Features

### User Features
- Signup/Login with JWT authentication  
- Create, edit, delete tasks  
- Assign tasks to team members (assignee can access assigned tasks only)  
- Conflict detection with options to keep server changes, overwrite, or merge  
- Subtasks support  
- Add comments and upload files to tasks  
- Drag-and-drop tasks across columns  
- Dark and light mode support  
- Real-time toast notifications for updates and conflicts  

### Additional Features
- Real-time collaboration using Socket.IO  
- Activity log showing last 20 actions  
- Responsive three-pane dashboard (Navbar, Sidebar, Kanban Board)  

---

## 📁 Project Structure

```
TodoCollabBackend/
│ ├─ controllers/
│ ├─ routes/
│ ├─ services/
│ ├─ repositories/
│ └─ models/
│
TodoCollabFrontend/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ hooks/
│ │ ├─ redux/
│ │ └─ styles/
│
└─ README.md
```

---

## 📂 Environment Variables

### For Frontend
```env
VITE_BACKEND_URL="your frontend url"
```

### For Backend
```env
PORT=5000
DB_URL="your mongodb url"
JWT_EXPIRES_IN="your jwt expiry"
JWT_SECRET="your jwt secret"
CLOUDINARY_API_KEY="your cloudinary api key"
CLOUDINARY_API_SECRET="your cloudinary api secret"
CLOUDINARY_CLOUD_NAME="your cloudinary name"

```

---

## 💻 Run Locally

### Clone and Setup Frontend
```bash
git clone https://github.com/Saroj05Dev/TodoCollabFrontend.git
cd TodoCollabFrontend
npm install
npm run dev
```

### Clone and Setup Backend
```bash
git clone https://github.com/Saroj05Dev/TodoBaord.git
cd TodoCollabBackend
npm install
npm start
```

---

## 🙋‍♂️ Author

**Saroj Kumar Das**

- 📧 Email: sarojkumardas.dev@gmail.com
- 🔗 LinkedIn: [Saroj Kumar Das](https://www.linkedin.com/in/saroj-kumar-das-86a36b30a)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to:
- Fork this repository
- Open issues for bugs or feature requests
- Submit pull requests

---

## 📜 License

This project is licensed under the **MIT License** – free to use and modify.

---

⭐ **If you found this project helpful, please consider giving it a star!**
