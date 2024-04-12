// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { blockchainService } from '../services/blockchainServices';
// import { ABI, ADDRESS } from '../services/blockchainServices';
// export const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [booking, setBooking] = useState(null);

//   useEffect(() => {
//     if (bookings.length > 0) return;

//     const getBookings = async () => {
//       const response = await axios.get(
//         "http://omdbapi.com?apikey=416ed51a&s=star"
//       );
//       setBookings(response.data.Search);
//     };

//     getBookings();
//   }, [bookings]);

//   const getBooking = async (id) => {
//     const response = await axios.get(
//       "http://omdbapi.com?apikey=416ed51a&i=" + id
//     );
//     setBooking(response.data);
//   };

//   return (
//     <>
//       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">{booking?.Title}</h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <h2>{booking?.Title}</h2>
//               <p>{booking?.Plot}</p>
//               <p>{booking?.Actors}</p>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button type="button" className="btn btn-primary">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bookings">
//         {bookings.map((booking) => (
//           <div key={booking.imdbID} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getBooking(booking.imdbID)}>
//             <h3>{booking.Title}</h3>
//             <div className="image-container">
//               <img src={booking.Poster} alt={booking.Title} />
//             </div>

//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ABI, ADDRESS } from '../services/blockchainServices';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const restaurantsContract = new web3.eth.Contract(ABI, ADDRESS);

export const Bookings = () => {
  const [bookingsDetails, setBookingsDetails] = useState([]); // Store full details here
  const restaurantId = 1;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingIds = await restaurantsContract.methods
          .getBookings(restaurantId)
          .call();
        const bookings = await Promise.all(
          bookingIds.map((id) =>
            restaurantsContract.methods.bookings(id).call()
          )
        );
        setBookingsDetails(bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1> {restaurantId}</h1>
      <ul>
        {bookingsDetails.map((booking, index) => (
          <li key={index}>
            Booking ID: {parseFloat(booking.id)}, Guests:{' '}
            {parseFloat(booking.numberOfGuests)}, Name: {booking.name}, Date:{' '}
            {booking.date}, Time: {parseFloat(booking.time)}
          </li>
        ))}
      </ul>
    </div>
  );
};
