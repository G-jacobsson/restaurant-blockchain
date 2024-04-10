import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/blockchainServices";
import "../styles/gdpr.css";
import "../styles/home.css";


export const Home = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const connectToWallet = async () => {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet', error);
      }
    };

    connectToWallet();
  }, []);

  useEffect(() => {
    const gdprConsent = localStorage.getItem("gdprConsent");
    if (gdprConsent === "true") {
      setShow(false);
    }
  }, []);

  const acceptGDPR = () => {
    localStorage.setItem("gdprConsent", "true");
    setShow(false);
  };

  const declineGDPR = () => {
    localStorage.setItem("gdprConsent", "false");
    setShow(false);
  };

  return (
    <>
      <div className={`gdpr-container ${show ? "show" : ""}`}>
        <header>
          <h2>GDPR Consent</h2>
        </header>
        <div className='data'>
          <p>
            This website collects the personal details that you put in when
            booking a table or when contacting us.
          </p>
          <a href='#'>Read more...</a>
        </div>
        <div className='buttons'>
          <button
            className='button'
            onClick={acceptGDPR}
          >
            Accept
          </button>
          <button
            className='button'
            onClick={declineGDPR}
          >
            Decline
          </button>
        </div>
      </div>
      <div className='home-container'>
        <div className='name-container imbue-variable'>
          <h2>Welcome to the End Of The World</h2>
          <h3>- Where you'll eat your last meal</h3>
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
    </>
  );
};
