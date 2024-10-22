import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../studentViewCss/home.css';
import { useState, useEffect } from 'react';
import logoutIcon from '../assets/logout.png'; 
import MainContent from './maincontents'; 

const Home = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('dashboard'); 
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const handleLogout = async () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');
    if (!isConfirmed) {
      return; 
    }
    try {
        await axios.post('http://localhost:8000/api/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        });
        navigate('/'); 
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  useEffect(() => {
    setActiveLink('profile'); // Set active link to dashboard on component mount
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="home-container">
      {/* Hamburger Navbar */}
      <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : '☰'} 
      </div>

      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <img src="assets/cvsu_logo.png" alt="Logo" className="logo" />
          <h3 className="logo-name">Cavite State University - Bacoor</h3>
        </div>
        <ul className={`nav-links ${isSidebarOpen ? 'open' : ''}`}>
          <li>
            <a
              href="#profile"
              className={activeLink === 'profile' ? 'active' : ''}
              onClick={() => {
                setActiveLink('profile');
                setSidebarOpen(false); 
              }}
            >
              Profile
            </a>
          </li>
          
          <li>
            <a
              href="#courses"
              className={activeLink === 'courses' ? 'active' : ''}
              onClick={() => {
                setActiveLink('courses');
                setSidebarOpen(false);
              }}
            >
              Checklist
            </a>
          </li>
          <li>
            <a
              href="#enroll"
              className={activeLink === 'enroll' ? 'active' : ''}
              onClick={() => {
                setActiveLink('enroll');
                setSidebarOpen(false);
              }}
            >
              Enroll
            </a>
          </li>
        </ul>
        {/* logout Button */}
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout" style={{ width: '40px', height: '40px' }} />
          </button>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        <MainContent activeLink={activeLink} /> {/* Render content based on active link */}
      </main>
    </div>
  );
};

export default Home;
