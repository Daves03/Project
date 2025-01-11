import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./auth";
import Home from "./studentView/home";
import Admin from "./admin/admin";
import Officers from "./officers-admin/officers";
import Faculty from "./faculty-admin/faculty";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />{" "}
        {/* Login/Registration/ForgetPassword Component */}
        <Route path="/admin" element={<Admin />} /> {/* Home Component */}
        <Route path="/home" element={<Home />} /> {/* Home Component */}
        <Route path="/officers" element={<Officers />} />{" "}
        {/* Officers Component */}
        <Route path="/faculty" element={<Faculty />} />{" "}
        {/* Faculty Component */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
