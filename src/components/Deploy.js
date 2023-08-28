// a react component for deploying a new Profile contract
import React, { useState } from "react";
import { ethers } from "ethers";
import Profile from "../artifacts/contracts/Profile.sol/Profile.json";
import { Button, Box, Typography, TextField } from "@mui/material";
// const ethers = require("ethers");
// const Profile = require("../artifacts/contracts/Profile.sol/Profile.json");
const ABI =  Profile.abi;
const bytecode = Profile.bytecode;
const imageCID = "QmaGRzjSfmxxMFhWpyB6Q3Z9XCHMLH5NvCxDBvuzq9NfiB/wired-meme-nft-brian.webp"

// interface DeployProps {
//     onDeploy: (address: string) => void;
// }

const Deploy = ({onDeploy}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deployedAddress, setDeployedAddress] = useState('');
    
    async function requestAccount() {
        if(window.ethereum){
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                console.log(accounts)           
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deployProfile = async () => {
        if (typeof window.ethereum !== "undefined") {
        await requestAccount();
        // const provider = new ethers.BrowserProvider(window.ethereum);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers
                            .ContractFactory(ABI, bytecode, signer);
        // const provider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);
        // const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        // const contract = new ethers
        //     .ContractFactory(ABI, bytecode, Wallet);
        try {
            const deployedContract = await contract.deploy(name, description, imageCID);
            await deployedContract.deployed();
            console.log("Deployed Contract: ", deployedContract);
            console.log("Deployed Contract Address: ", deployedContract.address);
            setDeployedAddress(deployedContract.address);
            onDeploy(deployedContract.address);
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
        <Button onClick={deployProfile}>Deploy</Button>
        {deployedAddress ? <p>Contract Address : {deployedAddress}</p> : ""}
        </div>
    );
    }

export default Deploy;
