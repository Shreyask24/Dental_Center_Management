# ENTNT Dental Center Management Dashboard

A frontend-only React application simulating a complete dental clinic management system with role-based access, appointment handling, and file upload, using `localStorage` as the data store.

> Built for ENTNT's Technical Assignment.

---

## 🚀 Demo

- 🔗 **Deployed App**: Preview
- 💻 **GitHub Repo**: [https://github.com/Shreyask24/Dental_Center_Management](https://github.com/Shreyask24/Dental_Center_Management)

---

## 🧠 Features

### 👨‍⚕️ User Authentication (Simulated)
- Hardcoded users (Admin & Patient) stored in localStorage
- Login using email and password
- Session persists across reloads

### 🧑‍⚕️ Admin Panel (Dentist)
- Manage Patients (Add/Edit/Delete)
- Manage Incidents/Appointments
- View Monthly/Weekly Calendar
- View Dashboard KPIs
- Upload and preview patient-related files (Base64/Blob URLs)

### 👤 Patient Panel
- View only their own appointments, treatment history, and uploaded files

### 📆 Calendar View
- Visual representation of upcoming appointments per day/week

### 📊 Dashboard KPIs
- Next 10 appointments
- Top patients by activity
- Revenue & treatment stats

### 💾 Data Storage
- All data managed via `localStorage`
- File uploads saved as Base64 or Blob URLs

### 💻 Tech Stack
- React (Functional Components + Hooks)
- React Router
- Context API
- TailwindCSS
- LocalStorage only (No backend/API)
- Form Validation

---

## Test Credentials

### Admin (Dentist)
Email: admin@entnt.in
Password: admin123

### Patient
Email: john@entnt.in
Password: patient123
---
## Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Shreyask24/Dental_Center_Management.git

# Install dependencies
npm install

# Start development server
npm start
