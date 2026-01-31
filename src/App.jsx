import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AppLayout from "./components/layout/AppLayout";
// import EmployeeForm from "./pages/EmployeeForm";

function App() {
  const isAuthenticated = true; 

  return (
    <Routes>
      {/* Public routes (if any later) */}
      {/* <Route path="/login" element={<Login />} /> */}

      <Route
        path="/"
        element={
          isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        {/* Employee routes */}
        {/* <Route path="employee">
          <Route index element={<EmployeeForm />} />
          <Route path=":id" element={<EmployeeForm />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
