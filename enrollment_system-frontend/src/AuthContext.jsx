// // AuthContext.js
// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setIsAuthenticated(false);
//       } else {
//         try {
//           const response = await axios.post(
//             "http://localhost:8000/api/verify-token",
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log("Token verification response:", response.data);
//           if (response.data.valid) {
//             setIsAuthenticated(true);
//           } else {
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             setIsAuthenticated(false);
//           }
//         } catch (error) {
//           console.error("Token verification failed:", error);
//           localStorage.removeItem("token");
//           localStorage.removeItem("role");
//           setIsAuthenticated(false);
//         }
//       }
//     };

//     checkToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
