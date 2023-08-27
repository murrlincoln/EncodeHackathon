// a react component for deploying a new Profile contract
import React, { useState } from "react";
import { ethers, AlchemyProvider } from "ethers";
import Profile from "../artifacts/contracts/Profile.sol/Profile.json";
// const ethers = require("ethers");
// const Profile = require("../artifacts/contracts/Profile.sol/Profile.json");
const ABI =  Profile.abi;
const bytecode = Profile.bytecode;
const imageCID = "QmaGRzjSfmxxMFhWpyB6Q3Z9XCHMLH5NvCxDBvuzq9NfiB/wired-meme-nft-brian.webp"

const Deploy = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deployedAddress, setDeployedAddress] = useState("");
    
    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }
    
    const deployProfile = async () => {
        if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = provider.getSigner();
        // const contract = new ethers
        //                     .ContractFactory(ABI, bytecode, signer);
        console.log("Private Key: ", process.env.PRIVATE_KEY)
        const provider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);
        const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers
            .ContractFactory(ABI, bytecode, Wallet);
        try {
            const deployedContract = await contract.deploy(name, description, imageCID);
            // await deployedContract.deployed();
            console.log("Deployed Contract: ", deployedContract);
            setDeployedAddress(deployedContract.address);
        } catch (err) {
            console.log("Error: ", err);
        }
        }
    };
    
    return (
        <div>
            <label>
            Name:
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            </label>
            <label>
                Description:
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </label>
        <button onClick={deployProfile}>Deploy</button>
        <p>{deployedAddress}</p>
        </div>
    );
    }

export default Deploy;
