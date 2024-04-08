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

  const handleConfirm = async (e) => {
    e.preventDefault();
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
        <p>
          {numberOfGuests} guests on {date} at {time}:00
        </p>
        <form onSubmit={handleConfirm}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="[0-9]{10}"
          />
          <button
            className="confirm-button"
            type="submit"
          >
            Confirm Booking
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={onClose}
          >
            Cancel Booking
          </button>
        </form>
      </div>
    </div>
  );
};
