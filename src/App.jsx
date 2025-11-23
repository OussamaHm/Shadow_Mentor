import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import EmployeeView from "./pages/EmployeeView";
import AdminPanel from "./pages/AdminPanel";
import Employees from "./pages/Employees";
import Analytics from "./pages/Analytics";
import Schedule from "./pages/Schedule";
import Certifications from "./pages/Certifications";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyLearning from "./pages/MyLearning";
import SchedulePage from "./pages/SchedulePage";
import PerformancePage from "./pages/PerformancePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/my-schedule" element={<SchedulePage />} />
        <Route path="/my-performance" element={<PerformancePage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/employee/:id" element={<EmployeeView />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
