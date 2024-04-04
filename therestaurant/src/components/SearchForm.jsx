import React, { useState } from 'react';
import { blockchainService } from '../services/blockchainServices';

export const SearchForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);

  const minGuests = 1;
  const maxGuests = 6;

  const guestOptions = [];
  for (let i = minGuests; i <= maxGuests; i++) {
    guestOptions.push(
      <option
        key={i}
        value={i}
      >
        {i}
      </option>
    );
  }

  const showAvailability = async (e) => {
    e.preventDefault();
    try {
      const bookings = await blockchainService.getBookings();
      setBookings(bookings);
      console.log('Show availability', numberOfGuests, date);
      setNumberOfGuests('');
      setDate('');
    } catch (error) {
      console.error('Failed to show availability:', error);
    }
  };

  return (
    <>
      <h3 className="search-info">
        Search for available tables at your desired date here
      </h3>
      <form
        className="search-form"
        onSubmit={showAvailability}
      >
        <label>
          Number of guests:
          <select
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            required
          >
            <option value="">Choose number of guests</option>
            {guestOptions}
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button
          className="search-button"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* <SearchResults bookings={bookings} /> */}
    </>
  );
};
