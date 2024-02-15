// MainComponent.js

import React, { useState } from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import { ethers } from "ethers";

const MainComponent = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Requesting user to connect their MetaMask wallet
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setWalletConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask to use this feature");
    }
  };

  return (
    <div>
      {walletConnected ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <ConnectWalletButton connectWallet={connectWallet} />
      )}
      {/* Your website content goes here */}
    </div>
  );
};

export default MainComponent;
