import React from 'react';
import '../styles/contact.css';

export const Contact = () => {
  return (
    <div className="form-container">
      <form>
        <h2 className="title">Talk to Us</h2>
        <div className="form-control">
          <input
            type="text"
            className="fullname"
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            className="phone"
            placeholder="Phone Number"
            required
          />
          <input
            type="email"
            className="email"
            placeholder="Email"
            required
          />
          <textarea
            name="message"
            id="message"
            cols="40"
            rows="10"
            placeholder="Message..."
            required
          ></textarea>
          <button className="btn">Send</button>
        </div>
      </form>
    </div>
  );
};
