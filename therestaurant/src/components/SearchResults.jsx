import React, { useState, useEffect } from 'react';
import { BookingPopup } from './BookingPopup';

const totalTables = 15;
const sittings = [18, 21];

export const SearchResults = ({ bookings, date, numberOfGuests, errorMsg }) => {
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
    <>
      {!errorMsg && (
        <form
          className="search-results"
          onSubmit={(e) => {
            e.preventDefault();
            if (selectedSitting) {
              setShowPopup(true);
            }
          }}
        >
          <h3 className="search-info available-sittings">
            Available Sittings:{' '}
          </h3>
          <select
            value={selectedSitting}
            onChange={(e) => setSelectedSitting(e.target.value)}
            required
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
            type="submit"
          >
            Continue booking
          </button>
        </form>
      )}

      {showPopup && (
        <BookingPopup
          onClose={() => setShowPopup(false)}
          date={date}
          time={selectedSitting}
          numberOfGuests={numberOfGuests}
        />
      )}
    </>
  );
};
