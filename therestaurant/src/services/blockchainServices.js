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

export const createRestaurant = async (name) => {
  try {
    const tx = await contract.createRestaurant(name);
    const receipt = await tx.wait();
    const event = receipt.events?.find((e) => e.event === 'RestaurantCreated');
    const restaurantId = event?.args?.id.toNumber();
    console.log('ID:', restaurantId);
    return restaurantId;
  } catch (error) {
    console.error(error);
  }
};
