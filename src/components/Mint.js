import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Profile from "../artifacts/contracts/Profile.sol/Profile.json";
import { Button, Box, Typography, TextField } from "@mui/material";
import axios from "axios";
import { use } from "chai";

const varsityBadgeAddress = process.env.REACT_APP_VARSITY_BADGE_ADDRESS;
const ownerV = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase();

const Mint = () => {
  const [mintAddress, setMintAddress] = useState(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [nftData, setNftData] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    fetchAccount();
  }, []);

  const upload = async () => {
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: "c0e2dd6b45a6227d90d5",
        pinata_secret_api_key:
          "2a48f55499ccea10aa77e58f3ad7a6212ae46b42ceff1befa0060a07a811f8b6",
        //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZGZkMTdkNy1jOTQwLTRjMjItODAzYi00MjdjNDg3MGRkZTkiLCJlbWFpbCI6ImRpbm5lcmpvaG44NEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTE5NTMzNjM5MzRlOWU1NmExN2EiLCJzY29wZWRLZXlTZWNyZXQiOiIzY2I2NzQ1ZjcxYTE3MGRhOTgxNzE0YWJkOTBhY2M3M2ZiNGJmODgzNzc1MWI4ZTFjMWU0ZmJhM2Y2NzFhMTVhIiwiaWF0IjoxNjY0NjgwMjYyfQ.VJ7VOyf4QOdQsQZhdAkTaD13Um6GTcsuGh3Ag76bQiI'
      },
      data: {
        attributes: ["att1", Date.now()],
        img: "QmSKMvApDTQbsrwjbw6XxUzBsxAEv9QNPqcDmLMEYT9Znb",
      },
    };

    const res = await axios(config);

    const resData = await res.data;

    const hash = await resData["IpfsHash"];

    // Justin's Hash: Qmdudq1w2mrUMfhSaN3DX3nUuUSPfMpamAqTDi3QPQjoik/Badge1Meta.json
    mintNFT(hash);
  };

  const fetchAccount = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Get the user's account address
        const accountAddress = accounts[0];
        setOwner(accountAddress);
        console.log(owner);
      } catch (error) {
        console.error("Error while fetching account address:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const mintNFT = async (hash) => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        varsityBadgeAddress,
        VarsityBadge.abi,
        signer
      );
      try {
        const data = await contract.safeMint(mintAddress, hash);
        console.log("data: ", data);
        // setMintAddress("");
        // setNftData("");
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  return (
    <div>
      {owner === ownerV ? (
        <Box sx={{ "& button": { m: 1 } }}>
          <TextField
            type="text"
            required
            placeholder="Address"
            value={mintAddress}
            onChange={(e) => {
              setMintAddress(e.target.value);
            }}
          />
          <Button variant="contained" onClick={upload}>
            Post
          </Button>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default Mint;