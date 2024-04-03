import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className='home-container'>
      <div className='name-container imbue-variable'>
        <h2>Welcome to The End Of the World</h2>
      </div>
      <div className='description-container'>
        <p className='description imbue-variable'>
          Feast at the End of The World, a posh spot with amazing food. Top
          chefs whip up fancy dishes in a fancy setting. It's all about luxury
          and deliciousness here. Get ready for a meal that'll blow your mind!
        </p>
        <Link
          className='link'
          to={"/booktable"}
        >
          Book a table here!
        </Link>
      </div>
    </div>
  );
};
