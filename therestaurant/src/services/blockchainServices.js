import { ethers } from 'ethers';
import { ADDRESS, ABI, RESTAURANT_ID } from '../config';
import { id } from 'ethers/lib/utils';

const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    console.error('No ethereum provider found');
  }
};

export const connectWallet = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return getProvider();
  } catch (error) {
    console.error(error);
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
      const bookings = await contract.getBookings(id);
      console.log('Bookings:', bookings);
      return bookings;
    } catch (error) {
      console.error('Failed to get bookings:', error);
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
      await contract.createBooking(
        numberOfGuests,
        name,
        date,
        time,
        restaurantId
      );
      console.log('Booking created successfully');
    } catch (error) {
      console.error('Failed to create booking:', error);
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
