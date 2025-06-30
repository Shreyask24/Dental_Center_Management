import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initLocalStorage } from "./utils/localStorage";
import { sampleData } from "./data/sampleData";
import Login from "./pages/Login";
import PatientView from "./pages/PatientView";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    initLocalStorage(sampleData);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Route
          path="/me"
          element={<ProtectedRoute role="Patient"><PatientView /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
