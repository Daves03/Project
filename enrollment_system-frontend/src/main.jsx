import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./auth";
import Home from "./studentView/home";
import Admin from "./admin/admin";
import Officers from "./officers-admin/officers";
import Faculty from "./faculty-admin/faculty";
import PrivateRoute from "./PrivateRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} /> {/* Login/Registration Component */}

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roleRequired="admin" element={<Admin />} />
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute roleRequired="student" element={<Home />} />
          }
        />
        <Route
          path="/officers"
          element={
            <PrivateRoute roleRequired="officers" element={<Officers />} />
          }
        />
        <Route
          path="/faculty"
          element={
            <PrivateRoute roleRequired="faculty" element={<Faculty />} />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);