// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Profile is ERC721, Ownable {
    string public profileName;
    string public profileDescription;
    string public profilePictureLink;

    address[] public owners;
    mapping(address => bool) public isOwner;

    constructor(
        string memory _name,
        string memory _description,
        string memory _pictureLink
    ) ERC721("Profile", "PRF") {
        profileName = _name;
        profileDescription = _description;
        profilePictureLink = _pictureLink;

        owners.push(msg.sender);
        isOwner[msg.sender] = true;
    }

    modifier onlyOwners() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    function addOwner(address _newOwner) external onlyOwners {
        require(!isOwner[_newOwner], "Address is already an owner");
        owners.push(_newOwner);
        isOwner[_newOwner] = true;
    }

    function removeOwner(address _ownerToRemove) external onlyOwners {
        require(isOwner[_ownerToRemove], "Address is not an owner");
        require(owners.length > 1, "At least one owner must remain");
        isOwner[_ownerToRemove] = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _ownerToRemove) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
    }

    function updateProfile(
        string memory _name,
        string memory _description,
        string memory _pictureLink
    ) external onlyOwners {
        profileName = _name;
        profileDescription = _description;
        profilePictureLink = _pictureLink;
    }

    function post(string memory _contentCID) external onlyOwners {
        // Implementation to create NFT from the content CID
        // Mint NFT and assign it to this contract
    }

    function proposeConnect(address _otherProfile) external onlyOwners {
        require(!isProposedConnection(_otherProfile), "Connection already proposed");
        // Call externalProposeConnect on the other profile contract
        // Passing this contract's address for approval/denial
    }

    function externalProposeConnect(address _proposingProfile) external onlyOwners {
        // Implementation to handle external connection proposal
    }

    function listProposedConnections() external view returns (address[] memory) {
        // Return array of proposed connection addresses
    }

    function isProposedConnection(address _profile) public view returns (bool) {
        // Check if the given address is in the list of proposed connections
        // Return true if proposed, false otherwise
    }
}
