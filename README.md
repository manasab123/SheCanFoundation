
# Intern Referral & Donation Portal

A full-stack web application built for internship program participants to manage their registrations, referral rewards, donation impact, and leaderboards.

> Built with(MERN Stack) `React.js`, `Node.js`, `Express`, and `MongoDB`  
>  Includes secure login, JWT authentication, and referral tracking

### Live Link
**complete responsive on phone and desktop**

https://she-can-foundationn.vercel.app/


## Features

- **User Registration**  only registred person can login
- **Referral System** — with unique referral code generation (`<NAME>2025`) & enter another user’s referral code during signup 
- **Secure Login** with hashed passwords and JWT authentication  

### Dashboard includes:  
- Personalized greeting using the user’s name  
- Referral code with copy-to-clipboard button  
- Total donations display  
- Rewards based on donation milestones 
- Referral history list (currently static)  

### Leaderboard:  
- Top 5 users shown by default  
- Option to show more or show less to view all 20 
### Responsive UI 
- works on mobile, tablet, desktop
### Modern Design using 
- React.js + Tailwind CSS

---

## Tech Stack

| Layer       | Technology                 |
|-------------|----------------------------|
| Frontend    | React.js, Tailwind CSS     |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB + Mongoose         |
| Auth        | JWT + bcryptjs             |
| Tools       | Axios, Postman             |

---
## Folder Structure

```bash
She Can Foundation
├── backend/                  
│   ├── server.js             
│   └── vercel.json           
│
├── frontend/                 
│   └── src/                  
│       ├── Data/             
│       │   └── leaderboardData.js #dummy data
│       ├── Pages/            
│       │   ├── Dashboard.jsx
│       │   ├── Leaderboard.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── App.jsx

```
## Installation

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
### Database
mongodb mongoose database


## API Routes

| Route          | Method | Access   | Description                       |
|----------------|--------|----------|-----------------------------------|
| `/register`    | POST   | Public   | Register a new intern             |
| `/login`       | POST   | Public   | Authenticate and get token        |
| `/dashboard`   | GET    | Private  | View logged-in user's dashboard   |
| `/leaderboard` | GET    | Private  | View top ranked users list        | static data


---

## Future Enhancements

- Public leaderboard with real-time updates
- Admin panel to view referral stats and reports
- Rank updation
- Navbar anf Footer for the page

---

## Acknowledgements

This project was built as part of an internship onboarding system with a goal to:

- Simplify participant engagement
- Enable transparent tracking of referrals
- Empower interns to amplify social good through donations


