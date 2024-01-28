import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UserDashboard from "./pages/User/UserDashboard";
import RegistrationForm from "./pages/User/RegistrationForm";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/Admin/AdminLogin";
import AddCourse from "./pages/Admin/AddCourse";
import AddResourcePerson from "./pages/Admin/AddResourcePerson";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ReportTable from "./pages/Admin/ReportTable";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard/:token" element={<UserDashboard />} />
        <Route path="/register-course/:token" element={<RegistrationForm />} />
        <Route path="/admin-dashboard/:token" element={<AdminDashboard />} />
        <Route path="/add-course/:token" element={<AddCourse />} />
        <Route path="/add-instructor/:token" element={<AddResourcePerson />} />

        <Route path="/course-report/:token" element={<ReportTable />} />
      </Routes>
    </>
  );
};

export default App;
