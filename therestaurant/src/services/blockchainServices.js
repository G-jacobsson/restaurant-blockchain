import { ethers } from 'ethers';
import { ADDRESS, ABI } from '../config';

if (window.ethereum) {
  window.provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.error('No ethereum provider found');
}

const signer = window.provider.getSigner();
const contract = new ethers.Contract(ADDRESS, ABI, signer);

// let accounts = await window.ethereum.request({
//   method: 'eth_requestAccounts',
// });

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
