import { ethers } from 'ethers';
import { ADDRESS, ABI } from '../config';

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

let restaurantId;

const createRestaurant = async (name) => {
  try {
    const contract = getWriteContract();
    await contract.createRestaurant(name);
    const response = await contract.restaurantCount();
    restaurantId = response.toNumber();
    console.log('ID:', restaurantId);
    return restaurantId;
  } catch (error) {
    console.error(error);
  }
};

createRestaurant('End of The World');
