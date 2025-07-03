import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PatientView from "./pages/PatientView";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManagePatients from "./pages/ManagePatients";
import ManageAppointments from "./pages/ManageAppointments";
import Calendar from "./pages/Calendar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user: loggedInUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {loggedInUser && loggedInUser.role === "Patient" ? (
          <Route
            path="/"
            element={<ProtectedRoute role="Patient"><PatientView /></ProtectedRoute>}
          />
        ) : loggedInUser ? (
          <>
            <Route
              path="/"
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
            />
            <Route
              path="/patients"
              element={<ProtectedRoute role="Admin"><ManagePatients /></ProtectedRoute>}
            />
            <Route
              path="/incidents"
              element={<ProtectedRoute role="Admin"><ManageAppointments /></ProtectedRoute>}
            />
            <Route
              path="/calendar"
              element={<ProtectedRoute role="Admin"><Calendar /></ProtectedRoute>}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
