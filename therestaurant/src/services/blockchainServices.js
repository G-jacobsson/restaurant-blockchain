import { ethers } from 'ethers';
import { ADDRESS, ABI, RESTAURANT_ID } from '../config';

const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error('No ethereum provider found');
  }
};

export const connectWallet = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return getProvider();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getReadContract = () => {
  const provider = getProvider();
  return new ethers.Contract(ADDRESS, ABI, provider);
};

export const getWriteContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(ADDRESS, ABI, signer);
};

export const blockchainService = {
  getRestaurant: async (id = RESTAURANT_ID) => {
    const contract = getReadContract();
    const restaurant = await contract.restaurants(id);
    console.log(`Restaurant ID: ${restaurant.id}`);
    console.log(`Restaurant Name: ${restaurant.name}`);
  },

  getBookings: async (id = RESTAURANT_ID) => {
    try {
      const contract = getReadContract();
      let bookings = await contract.getBookings(id);
      bookings = bookings.map((booking) => parseInt(booking));
      console.log('Bookings:', bookings);
      return bookings;
    } catch (error) {
      throw new Error('Failed to get bookings:' + error.message);
    }
  },

  getBookingDetails: async (id = RESTAURANT_ID) => {
    try {
      const contract = getReadContract();
      const bookings = await contract.getBookings(id);

      const bookingIds = bookings.map((booking) => {
        return parseInt(booking);
      });
      console.log('Booking ids:', bookingIds);

      const bookingDetails = await Promise.all(
        bookingIds.map(async (id) => {
          const booking = await contract.bookings(id);
          return {
            id: parseInt(booking[0]._hex),
            numberOfGuests: parseInt(booking[1]._hex),
            name: booking[2],
            date: booking[3],
            time: parseInt(booking[4]._hex),
            restaurantId: parseInt(booking[5]._hex),
          };
        })
      );
      console.log('Booking details:', bookingDetails);

      return bookingDetails;
    } catch (error) {
      throw new Error('Failed to get booking details:' + error.message);
    }
  },

  createBooking: async (
    numberOfGuests,
    name,
    date,
    time,
    restaurantId = RESTAURANT_ID
  ) => {
    try {
      const contract = getWriteContract();
      const transaction = await contract.createBooking(
        numberOfGuests,
        name,
        date,
        time,
        restaurantId
      );
      await transaction.wait();
      console.log('Booking created successfully');
    } catch (error) {
      throw new Error('Failed to create booking:' + error.message);
    }
  },

  editBooking: async (id, numberOfGuests, name, date, time) => {
    try {
      const contract = getWriteContract();
      const transaction = await contract.editBooking(
        id,
        numberOfGuests,
        name,
        date,
        time
      );
      await transaction.wait();
      console.log('Booking edited successfully');
    } catch (error) {
      throw new Error('Failed to edit booking:' + error.message);
    }
  },

  removeBooking: async (id) => {
    try {
      const contract = getWriteContract();
      const transaction = await contract.removeBooking(id);
      await transaction.wait();
      console.log('Booking removed successfully');
    } catch (error) {
      throw new Error('Failed to remove booking:' + error.message);
    }
  },
};

// let restaurantId;

// const createRestaurant = async (name) => {
//   try {
//     const contract = getWriteContract();
//     await contract.createRestaurant(name);
//     const response = await contract.restaurantCount();
//     restaurantId = response.toNumber();
//     console.log('ID:', restaurantId);
//     return restaurantId;
//   } catch (error) {
//     console.error(error);
//   }
// };

// createRestaurant('End of The World');
