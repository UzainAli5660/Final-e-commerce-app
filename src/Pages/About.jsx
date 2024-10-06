import React, { useContext } from 'react';
import '../App.css';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const AboutUs = () => {
  const { theme } = useContext(ThemeContext); // Get current theme

  return (
    <div className={`about-us-container ${theme === 'light' ? 'bg-gray-500 text-gray-900' : 'bg-gray-950 text-white'}`}>
      <header className="about-us-header">
        <h1 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>About Us</h1>
      </header>
      <section className="about-us-content">
        <div className="about-us-team">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>Uzain Ali</h3>
            <p className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>CEO & Founder</p>
          </div>
        </div>
        <div className="about-us-mission">
          <h2 className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>Our Mission</h2>
          <p  className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
            We are a textile company where you can get any type of clothes you want....
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
