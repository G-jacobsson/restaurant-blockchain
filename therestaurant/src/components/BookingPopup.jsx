import React from 'react';

export const BookingPopup = ({ onClose }) => {
  return (
    <div className="booking-popup">
      <div className="booking-popup-content">
        <h2>Booking Details</h2>
        <p>This is a simple pop-up.</p>
        <button className="confirm-button">Confirm Booking</button>
        <button
          className="cancel-button"
          onClick={onClose}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};
