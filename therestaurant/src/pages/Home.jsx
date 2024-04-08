import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connectWallet } from '../services/blockchainServices';

export const Home = () => {
  useEffect(() => {
    const connectToWallet = async () => {
      try {
        await connectWallet(); // Call the function
      } catch (error) {
        console.error('Failed to connect wallet', error);
      }
    };

    connectToWallet();
  }, []);

  return (
    <div className="home-container">
      <div className="name-container imbue-variable">
        <h2>Welcome to The End Of the World</h2>
        <h3>A rare culinary experience</h3>
      </div>
      <div className="description-container">
        <p className="description imbue-variable">
          Feast at the End of The World, a moody spot with amazing food made by
          top chefs. With creative imagination we only use fresh beating
          produce. It's all about mystery and deliciousness here. Get ready for
          a meal that'll leave you craving more...
        </p>
        <Link
          className="link"
          to={'/booktable'}
        >
          Book a table here!
        </Link>
      </div>
    </div>
  );
};
