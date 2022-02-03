import React, { useState, useEffect } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "grover_sumrit";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [phantomWalletKey, setphantomWalletKey] = useState(null);

  const isWalletConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("wallet found");
          const res = await solana.connect({ onlyIfTrusted: true });
          setphantomWalletKey(res.publicKey.toString());
        }
      } else {
        alert("Please install Solana Wallet");
      }
    } catch (error) {
      console.log("error while connecting to wallet", error);
    }
  };

  useEffect(() => {
    const loading = async () => {
      await isWalletConnected();
    };
    window.addEventListener("load", loading);
    return () => {
      window.removeEventListener("load", loading);
    };
  }, []);

  const connectwallet = async () => {
    const { solana } = window;
    const res = await solana.connect();
    console.log(res.publicKey.toString());
    setphantomWalletKey(res.publicKey.toString());
  };

  const ConnectToWallet = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectwallet}
    >
      Connect to Phantom
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Demon Slayer NFT Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!phantomWalletKey ? (
            ConnectToWallet()
          ) : (
            <CandyMachine walletAddress={window.solana} />
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
