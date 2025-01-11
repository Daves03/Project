// import React, { useEffect, useContext } from "react";
// import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import axios from "axios";
// import Auth from "./auth";
// import Home from "./studentView/home";
// import Admin from "./admin/admin";
// import Officers from "./officers-admin/officers";
// import Faculty from "./faculty-admin/faculty";
// import setupAxiosInterceptors from "./utils/axiosSetup";
// import AuthContext from "./AuthContext";

// const App = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

//   useEffect(() => {
//     setupAxiosInterceptors(navigate);

//     const checkToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setIsAuthenticated(false);
//       } else {
//         try {
//           const response = await axios.post(
//             "http://localhost:8000/api/verify-token",
//             null,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log("Token verification response:", response.data);
//           setIsAuthenticated(response.data.valid || false);
//         } catch (error) {
//           console.error("Token verification failed:", error);
//           localStorage.removeItem("token");
//           localStorage.removeItem("role");
//           setIsAuthenticated(false);
//         }
//       }
//     };

//     checkToken();
//   }, [navigate, setIsAuthenticated]);

//   useEffect(() => {
//     console.log("isAuthenticated:", isAuthenticated);
//   }, [isAuthenticated]);

//   return (
//     <Routes>
//       <Route path="/" element={<Auth />} />
//       {isAuthenticated ? (
//         <>
//           <Route path="/admin" element={<Admin />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/officers" element={<Officers />} />
//           <Route path="/faculty" element={<Faculty />} />
//         </>
//       ) : (
//         <Route path="*" element={<Navigate to="/" replace />} />
//       )}
//     </Routes>
//   );
// };

// export default App;
