// src/Auth.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './css/auth.css'; // Import the CSS for styling

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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
  
      // Debug: Check the stored role
      console.log('Token:', localStorage.getItem('token'));
      console.log('Role:', localStorage.getItem('role'));
      
      alert('Logged in successfully!');

      // Navigate to the appropriate dashboard based on role
      if (response.data.role === 'admin') {
        console.log('Redirecting to admin dashboard...');
        navigate('/admin-dashboard'); 
    } else if (response.data.role === 'student') {
        console.log('Redirecting to student dashboard...');
        navigate('/home'); 
      }
  } catch (error) {
    console.error('Login failed:', error);
    const message = error.response?.data?.message || 'Invalid credentials!';
    alert(message);
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
            <button className='loginButtons' type="submit">Confirm</button>
            <p>
              Already have an account?{' '}
              <button className='login-button'   onClick={() => {
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
            <button className='loginButtons' type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <p>
              {isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button className='textButton' onClick={() => {
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
                  <button className='text-forgot' onClick={() => {
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
