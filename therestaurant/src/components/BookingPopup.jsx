import React, { useState } from 'react';
import { blockchainService } from '../services/blockchainServices';

export const BookingPopup = ({
  onClose,
  numberOfGuests,
  date,
  time,
  restaurantId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = async () => {
    try {
      if (!numberOfGuests || !date || !time) {
        console.error('One or more booking details are missing');
        return;
      }

      const combinedName = `${name} | ${email} | ${phoneNumber}`;
      await blockchainService.createBooking(
        numberOfGuests,
        combinedName,
        date,
        time,
        restaurantId
      );
      console.log('Booking created successfully');
      onClose();
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <div className="booking-popup">
      <div className="booking-popup-content">
        <h2>Booking Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          className="confirm-button"
          onClick={handleConfirm}
        >
          Confirm Booking
        </button>
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
