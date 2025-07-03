# 🦷 ENTNT Dental Center Management Dashboard

A modern, fully responsive **frontend-only** React app that simulates a complete dental clinic management system for ENTNT — supporting both **Admin (Dentist)** and **Patient** roles.

---

## Demo Links

- **Live App**: [View Deployed App](https://shreyas-dental-app.netlify.app/)  
- **GitHub Repo**: [github.com/Shreyask24/Dental_Center_Management](https://github.com/Shreyask24/Dental_Center_Management)

---

## Features

### User Authentication (Simulated)
- Hardcoded users with roles: `Admin`, `Patient`
- Email/password-based login
- Session persistence using `localStorage`
- Role-based access & route protection

---

### Admin Panel (Dentist)
- Dashboard with KPIs:
  - Next 10 appointments
  - Total Revenue
  - Top Patients
  - Completed, Pending Treatments
- **Patient Management**: Add / Edit / Delete patients
- **Incident Management** (per patient):
  - Appointment scheduling
  - Status tracking (Pending/Completed)
  - Cost, notes, next visit
  - File uploads (invoices, scans)
- **Calendar View**:
  - Visual month view of upcoming appointments
  - Days with appointments are highlighted

---

### Patient Panel
- Sees only their data (based on `patientId`)
- View upcoming appointments and past treatments
- File previews (invoices, x-rays, etc.)

---

### Data Storage
- All users, patients, and incidents stored in `localStorage`
- Uploaded files are stored as base64 or Blob URLs

---

## Tech Stack

React 
React Router DOM 
Context API 
TailwindCSS 
React Calendar (`react-calendar`) 
`localStorage` All data persistence 

---

## Test Credentials

### Admin (Dentist)
Email: admin@entnt.in
Password: admin123

### Patient (John)
Email: john@entnt.in
Password: patient123

---

## Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/Shreyask24/Dental_Center_Management.git

# Move into the project directory
cd Dental_Center_Management

# Install dependencies
npm install

# Start the development server
npm start
The app will be running at http://localhost:3000

Project Structure
src/
│
├── components/         # Navbar, Modals, Forms, Cards
├── pages/              # PatientView, AdminDashboard, Calendar, etc.
├── utils/              # localStorage helpers
├── context/            # AuthContext for user session
├── assets/             # Images or file assets (if any)
└── App.jsx             # Routes and layout logic
```

## Screenshots
Login
![image](https://github.com/user-attachments/assets/06f74993-9baa-4dc9-bd00-36a0e60327c6)

Patient
![image](https://github.com/user-attachments/assets/361b6ea0-5e80-4d2e-9dc5-30194dd010f8)

Admin
![image](https://github.com/user-attachments/assets/865f9cf9-5994-4807-9a89-74fff985853b)

