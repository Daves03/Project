// src/Auth.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './css/auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      console.log(response.data);
      alert('Logged in successfully!');
      navigate('/home'); 
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/register', { name, email, password, verificationCode });
      alert('Registered successfully! Please login.');
      setIsLogin(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Error during registration!');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email!');
  };

  const handleSendCode = async () => {
    try {
      await axios.post('http://localhost:8000/api/send-code', { email });
      alert('Verification code sent to your email!');
    } catch (error) {
      console.error('Error sending code:', error);
      alert('Error sending verification code!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="assets/cvsu_logo.png" alt="University Logo" className="logo" />
        <h3>Cavite State University - Bacoor</h3>
        <h2>{isLogin ? 'Login' : isForgotPassword ? 'Forgot Password' : 'Register'}</h2>

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
            <div className="verification-code-container">
              <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <button type="button" onClick={handleSendCode}>
                Send
              </button>
            </div>
            <button type="submit">Confirm</button>
            <p>
              Already have an account?{' '}
              <button onClick={() => {
                setIsForgotPassword(false);
                setIsLogin(true);
              }}>
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
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
            {!isLogin && (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="verification-code-container">
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <button type="button" onClick={handleSendCode}>
                    Send
                  </button>
                </div>
              </>
            )}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <p>
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button onClick={() => {
                    setIsLogin(false);
                  }}>
                    Register
                  </button>
                </>
              ) : (
                <button onClick={() => {
                  setIsLogin(true);
                }}>
                  Login
                </button>
              )}
              {isLogin && (
                <>
                  <br />
                  <button onClick={() => {
                    setIsForgotPassword(true);
                  }}>
                    Forgot Password?
                  </button>
                </>
              )}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
