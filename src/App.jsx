import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getData, initLocalStorage } from "./utils/localStorage";
import { sampleData } from "./data/sampleData";
import Login from "./pages/Login";
import PatientView from "./pages/PatientView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    initLocalStorage(sampleData);
  }, []);

  const loggedInUser = getData("loggedInUser")

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {loggedInUser.role === "Patient" ? (
          <Route
            path="/"
            element={<ProtectedRoute role="Patient"><PatientView /></ProtectedRoute>}
          />
        ) : (
          <>
            <Route
              path="/"
            // element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/patients"
            // element={<ProtectedRoute role="Admin"><Patients /></ProtectedRoute>}
            />
            <Route
              path="/incidents"
            // element={<ProtectedRoute role="Admin"><Incidents /></ProtectedRoute>}
            />
            <Route
              path="/calendar"
            // element={<ProtectedRoute role="Admin"><Calendar /></ProtectedRoute>}
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
