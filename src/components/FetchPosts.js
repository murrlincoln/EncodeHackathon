import React, { useState } from "react";
import { ethers } from "ethers";
import Profile from "../artifacts/contracts/Profile.sol/Profile.json";
import axios from "axios";

const FetchPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetch = async (hash) => {
        var config = {
            method: "get",
            url: "https://gateway.pinata.cloud/ipfs/{hash}"
        }
        const res = await axios(config);
        const resData = await res.data;
        return resData;
    }

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    }

    const fetchPosts = async () => {
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
                const hashLists = await contract.listPosts();
                // iterate hashLists and get the data from IPFS and store it in an array
                const data = [];
                for (var i = 0; i < hashLists.length; i++) {
                    const hash = hashLists[i];
                    const data = await fetch(hash);
                    data.push(data);
                }
                console.log("data: ", data);
                setPosts(data);
                // setMintAddress("");
                // setNftData("");
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    };
        
    return (
        <div>
            <h1>Fetch Posts</h1>
            <button onClick={fetchPosts}>Fetch</button>
            {posts.map((post, index) => (
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>{post.author}</p>
                    <p>{post.date}</p>
                </div>
            ))}
        </div>
    );
}

export default FetchPosts;