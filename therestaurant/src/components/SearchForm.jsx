import React, { useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainServices';
import { SearchResults } from './SearchResults';

export const SearchForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [date, setDate] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [minDate, setMinDate] = useState('');

  const minGuests = 1;
  const maxGuests = 6;

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
    setDate(formattedDate);
  }, []);

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
    setSearchClicked(true);
    try {
      const bookings = await blockchainService.getBookingDetails();
      setBookings(bookings);
      console.log('Show availability', numberOfGuests, date);
      setSubmittedDate(date);
      // setNumberOfGuests('');
      // setDate('');
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
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button
          className="search-button"
          type="submit"
        >
          Search
        </button>
      </form>

      {searchClicked && (
        <SearchResults
          bookings={bookings}
          date={submittedDate}
          numberOfGuests={numberOfGuests}
          searchClicked={searchClicked}
        />
      )}
    </>
  );
};
