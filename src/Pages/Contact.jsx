// src/ContactUs.js
import React from 'react';
import '../App.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <header className="contact-us-header">
        <h1>Contact Us</h1>
      </header>
      <section className="contact-us-info">
        <div className="contact-item">
          <h2>Email</h2>
          <p><a href="mailto:contact@company.com">nasak324@gmail.com</a></p>
        </div>
        <div className="contact-item">
          <h2>Phone</h2>
          <p><a href="tel:+1234567890">+123 456 7890</a></p>
        </div>
        <div className="contact-item">
          <h2>Address</h2>
          <p>123 Company Street, Suite 456<br />Karachi, Pakistan</p>
        </div>
        <div className="contact-item">
          
          <p>Monday - Friday: 9 AM - 5 PM<br />Saturday - Sunday: Closed</p>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
