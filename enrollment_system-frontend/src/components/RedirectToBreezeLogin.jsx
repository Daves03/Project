import React, { useEffect } from "react";

const RedirectToBreezeLogin = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8000/login"; // Adjust based on your backend URL
  }, []);

  return <div>Redirecting to login...</div>; // Optional: Show a message while redirecting
};

export default RedirectToBreezeLogin;
