import React, { useState } from 'react';

export const SearchForm = () => {
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [date, setDate] = useState('');
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

  const showAvailability = (e) => {
    e.preventDefault();
    console.log('Show availability', numberOfGuests, date);
    setNumberOfGuests('');
    setDate('');
  };

  return (
    <>
      <div>Search for available tables at your desired date here</div>
      <form onSubmit={showAvailability}>
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
        <button type="submit">Search</button>
      </form>
    </>
  );
};
