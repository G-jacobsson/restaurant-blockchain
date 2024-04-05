import React from 'react';
import { SearchForm } from '../components/SearchForm';
import '../styles/booking.css';

export const BookTable = () => {
  return (
    <>
      <div className="booking-container imbue-variable">
        <h1 className="booking-title">Book a Table</h1>
        <SearchForm />
      </div>
    </>
  );
};
