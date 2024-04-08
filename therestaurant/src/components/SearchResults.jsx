import React, { useState, useEffect } from 'react';
import { BookingPopup } from './BookingPopup';

const totalTables = 15;
const sittings = [18, 21];

export const SearchResults = ({ bookings, date, numberOfGuests }) => {
  const [selectedSitting, setSelectedSitting] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [availableSittings, setAvailableSittings] = useState([]);

  useEffect(() => {
    const newAvailableSittings = sittings.map((sitting) => {
      const bookingsForSitting = bookings.filter(
        (booking) => booking.date === date && booking.time === Number(sitting)
      );
      const availableTables = totalTables - bookingsForSitting.length;
      return { sitting, availableTables };
    });

    setAvailableSittings(newAvailableSittings);
  }, [bookings, date]);

  return (
    <div>
      <h3 className="search-info">Available Sittings: </h3>
      <select
        value={selectedSitting}
        onChange={(e) => setSelectedSitting(e.target.value)}
      >
        <option value="">Select a sitting</option>
        {availableSittings.map(
          ({ sitting, availableTables }, index) =>
            availableTables > 0 && (
              <option
                key={index}
                value={sitting}
              >
                {sitting}:00 - {availableTables} tables available
              </option>
            )
        )}
      </select>
      <button
        className="continue-button"
        onClick={() => setShowPopup(true)}
        disabled={!selectedSitting}
      >
        Continue booking
      </button>

      {showPopup && (
        <BookingPopup
          onClose={() => setShowPopup(false)}
          date={date}
          time={selectedSitting}
          numberOfGuests={numberOfGuests}
        />
      )}
    </div>
  );
};
