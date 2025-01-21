import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/auth.css";

import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  // 1234
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "student") {
        navigate("/home");
      } else if (role === "admin") {
        navigate("/admin");
      } else if (role === "officers") {
        navigate("/officers");
      } else if (role === "faculty") {
        navigate("/faculty");
      }
    }
  }, [navigate]);

  const handleLogin = async (email, password) => {
    try {
      console.log("Login function called");
  
      const apiUrl = "https://backend-production-d644.up.railway.app";
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });
  
      console.log(response.data); // Log the response from the backend
  
      if (response.data.token && response.data.role) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
  
        // Navigate based on role
        switch (response.data.role) {
          case "student":
            navigate("/home");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "officers":
            navigate("/officers");
            break;
          case "faculty":
            navigate("/faculty");
            break;
          default:
            alert("Unknown role. Please contact support.");
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle errors gracefully
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        console.error("Error:", error);
        alert("There was an error with the login process. Please try again later.");
      }
    }
  };
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/send-message`, {
        email,
        message,
      });
      alert("Message sent successfully!");
      setIsLogin(true);
    } catch (error) {
      console.error("Message sending failed:", error);
      alert("Error sending message!");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src="assets/cvsu_logo.png"
          alt="University Logo"
          className="logo"
        />
        <h3>Cavite State University - Bacoor</h3>
        <h2>
          {isLogin
            ? "Login"
            : isForgotPassword
            ? "Forgot Password"
            : "Request Account"}
        </h2>

        {isForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="loginButtons" type="submit">
              Confirm
            </button>
            <p>
              Already have an account?{" "}
              <button
                className="login-panel"
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsLogin(true);
                }}
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={isLogin ? handleLogin : handleSendMessage}>
            {isLogin ? (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="loginButtons" type="submit">
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <button
                    className="textButton"
                    onClick={() => {
                      setIsLogin(false);
                    }}
                  >
                    Send Message
                  </button>
                  <br />
                  <button
                    className="text-forgot"
                    onClick={() => {
                      setIsForgotPassword(true);
                    }}
                  >
                    Forgot Password?
                  </button>
                </p>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Recipient's Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  className="text-area-box"
                  placeholder="Message Description"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <button className="loginButtons" type="submit">
                  Send Message
                </button>
                <p>
                  <button
                    className="login-panel"
                    onClick={() => {
                      setIsLogin(true);
                    }}
                  >
                    Login
                  </button>
                </p>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
