import React, { useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainServices';
import { SearchResults } from './SearchResults';
import { MdClose } from 'react-icons/md';

export const SearchForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [date, setDate] = useState('');
  const [submittedDate, setSubmittedDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
      const getBookings = await blockchainService.getBookingDetails();
      if (getBookings) {
        setBookings(getBookings);
      }
      setSubmittedDate(date);
    } catch (error) {
      setErrorMsg('Failed to show availability:' + error.message);
    }
  };

  return (
    <>
      {errorMsg && (
        <div className="error-message">
          {errorMsg}
          <MdClose
            className="close-icon"
            onClick={() => {
              setErrorMsg('');
              setSearchClicked(false);
            }}
          />
        </div>
      )}
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
          errorMsg={errorMsg}
        />
      )}
    </>
  );
};
