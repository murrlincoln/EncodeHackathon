// a react component for deploying a new Profile contract

import React, { useState } from "react";
import { ethers } from "ethers";
import Profile from "../artifacts/contracts/Profile.sol/Profile.json";

const Deploy = (name, description, imageCID) => {
    const [deployedAddress, setDeployedAddress] = useState("");
    
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    
    const deployProfile = async () => {
        if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            ProfileAddress,
            Profile.abi,
            signer
        );
        try {
            const deployedContract = await contract.deploy(name, description, imageCID);
            console.log("Deployed Contract: ", deployedContract);
            setDeployedAddress(deployedContract.address);
        } catch (err) {
            console.log("Error: ", err);
        }
        }
    };
    
    return (
        <div>
        <h1>Deploy Profile</h1>
        <button onClick={deployProfile}>Deploy</button>
        <p>{deployedAddress}</p>
        </div>
    );
    }