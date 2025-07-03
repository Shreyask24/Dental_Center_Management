import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getData, initLocalStorage } from "./utils/localStorage";
import { sampleData } from "./data/sampleData";
import Login from "./pages/Login";
import PatientView from "./pages/PatientView";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManagePatients from "./pages/ManagePatients";
import ManageAppointments from "./pages/ManageAppointments";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    initLocalStorage(sampleData);
    const user = getData("loggedInUser");
    setLoggedInUser(user);
    console.log(user)
    setLoading(false);
  }, []);


  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {loggedInUser && loggedInUser.role === "Patient" ? (
          <Route
            path="/"
            element={
              <ProtectedRoute role="Patient">
                <PatientView />
              </ProtectedRoute>
            }
          />
        ) : loggedInUser ? (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute role="Admin">
                  <ManagePatients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/incidents"
              element={
                <ProtectedRoute role="Admin">
                  <ManageAppointments />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/calendar"
              element={
                <ProtectedRoute role="Admin">
                  <div>Calendar Page</div>
                </ProtectedRoute>
              }
            /> */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
