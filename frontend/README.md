# 🛍️ E-commerce Chatbot – Footwear Category

A smart, conversational chatbot built for e-commerce product search and assistance, focused on **footwear**.  
This project was built as part of the Uplyft.ai Internship Case Study (Round 1).

---

## 🚀 Features

- 🔍 Smart search-based chat interaction
- 🖼️ Dynamic product display (name, price)
- 📦 Mock product database (100+ items)
- 👤 Firebase Auth (Google Sign-In)
- 💬 Message tracking with timestamps
- 🗂️ Messages stored in Firebase Realtime Database
- 🌗 Fully responsive and **dark mode** friendly UI

---

## 🛠️ Tech Stack

| Frontend     | Backend         | Database       | Auth             |
|--------------|-----------------|----------------|------------------|
| Next.js (TS) | Flask (Python)  | PostgreSQL     | Firebase Auth    |
| Tailwind CSS | RESTful API     | Firebase Realtime DB | Google OAuth |

---

## 📁 Project Structure

/app
/chatbot → Chat UI Component (TSX)
/auth → Google Login Logic
/api → Next.js API if needed
/backend → Flask server (search endpoint)
/db → PostgreSQL dump + seed
/lib → Firebase config


---

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/ecommerce-chatbot.git
cd ecommerce-chatbot

### 2. Setup the Backend (Flask)

    cd backend
    pip install -r requirements.txt
    python server.py


### 3. Setup the Frontend (Next.js + TS)

    cd frontend
    npm install
    npm run dev


###4. Setup Firebase

    Create a project on Firebase Console.

    Enable Authentication > Google Sign-In.

    Enable Realtime Database.

    Paste your config in lib/firebase.ts.


🧠 Sample Query

    Input: "running shoes"
    Response:
    👟 Nike Revolution 6 - ₹2999
    👟 Adidas Duramo SL - ₹3199
    👟 Puma Flyer Runner - ₹2899


⚙️ Challenges Faced

    Managing CORS issues during dev between Flask & Next.js

    Timestamp formatting across client/server

    Firebase DB rules and secure message writes

    Designing chat UI with dark mode and timestamp clarity


📄 License
    MIT License.

🙋‍♂️ Author
    Abhishek
    • LinkedIn : https://www.linkedin.com/in/abhishek-067946261/
    • GitHub  :  https://github.com/Abhishek-Jatav?tab=repositories

