import React, { useState } from 'react';
import { BookingPopup } from './BookingPopup';

const totalTables = 15;
const sittings = [18, 21];

export const SearchResults = ({ bookings, date, numberOfGuests }) => {
  const [selectedSitting, setSelectedSitting] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const availableSittings = sittings.map((sitting) => {
    const bookingsForSitting = bookings.filter(
      (booking) => booking.date === date && booking.sitting === sitting
    );
    const availableTables = totalTables - bookingsForSitting.length;
    console.log(`Sitting: ${sitting}, Available Tables: ${availableTables}`);
    return { sitting, availableTables };
  });

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
          sitting={selectedSitting}
          numberOfGuests={numberOfGuests}
        />
      )}
    </div>
  );
};
