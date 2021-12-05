import "./App.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./views/User/HomeView/HomeView";
import Login from "./views/User/LoginView/Login";
import Register from "./views/User/RegisterView/Register";
import Profile from "./views/User/Profile/Profile";
import AdminLogin from "./views/Admin/AdminLoginView/AdminLogin";
import AdminRegister from "./views/Admin/AdminRegisterView/AdminRegister";
import AdminDashboard from "./views/Admin/AdminDashboardView/AdminDashboard";
import ApartmentMaster from "./views/User/ApartmentView/ApartmentMaster";
import ApartmentTypeMaster from "./views/User/ApartmentTypeView/ApartmentTypeMaster";

export default function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="apartment" element={<ApartmentMaster />}>
              <Route path=":slug" element={<ApartmentMaster />} />
            </Route>
            <Route path="apartment-type" element={<ApartmentTypeMaster />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="admin-dashboard" element={<AdminDashboard />}>
              <Route path=":slug" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}
