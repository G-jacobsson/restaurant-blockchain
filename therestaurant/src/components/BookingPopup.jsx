import React, { useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainServices';
import { MdClose } from 'react-icons/md';

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
  const [bookingCreated, setBookingCreated] = useState(false);
  const [bookingfailed, setBookingFailed] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      if (!numberOfGuests || !date || !time) {
        alert('One or more booking details are missing');
        return;
      }

      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const combinedName = `${name} | ${email} | ${phoneNumber}`;
        await blockchainService.createBooking(
          numberOfGuests,
          combinedName,
          date,
          time,
          restaurantId
        );
        setBookingCreated(true);
        setTimeout(onClose, 3000);
      } else {
        alert('Error: Please install MetaMask');
      }
    } catch (error) {
      setBookingFailed(true);
    }
  };

  return (
    <div
      className="booking-popup"
      onClick={onClose}
    >
      {bookingCreated ? (
        <div className="success-message">Booking created successfully!</div>
      ) : bookingfailed ? (
        <div className="error-message">
          Failed to create booking. Please try again.
        </div>
      ) : (
        <div
          className="booking-popup-content"
          onClick={(e) => e.stopPropagation()}
        >
          <MdClose
            className="close-icon"
            onClick={onClose}
          />
          <h2 className="popup-title">Booking Details</h2>
          <h3 className="popup-subtitle">
            {numberOfGuests} guests on {date} at {time}:00{' '}
          </h3>

          <p className="popup-text">
            {' '}
            Please provide your contact details to confirm the booking.
          </p>

          <form
            className="popup-form"
            onSubmit={handleConfirm}
          >
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
            <div className="button-container">
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
