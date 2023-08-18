// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Profile is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    struct Connection {
        address profileAddress;
        bool approved;
    }
    string public profileName;
    string public profileDescription;
    string public profilePictureLink;
    Counters.Counter private postCounter;
    Counters.Counter private proposalCounter;

    address[] public owners;
    mapping(address => bool) public isOwner;

    address[] private proposals;
    mapping(address => bool) private proposedConnections;
    
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
        // Increment postCount
        uint256 tokenId = postCounter.current();
        postCounter.increment();
        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, _contentCID);
    }

    function proposeConnect(address _otherProfile) external onlyOwners {
        require(!isProposedConnection(_otherProfile), "Connection already proposed");
        // Call externalProposeConnect on the other profile contract
        // Passing this contract's address for approval/denial
        // Add the other profile to the list of proposed connections
        // Increment proposalCount
        externalProposeConnect(_proposingProfile);
    }

    function externalProposeConnect(address _proposingProfile) external onlyOwners {
        // Implementation to handle external connection proposal
        // Add the proposing profile to the list of proposed connections
        // Increment connectionCount
        proposalCounter.increment();
        proposedConnections[_proposingProfile] = true;
        ExternalProfile(_proposingProfile).externalProposeConnect(address(this));
    }

    function listProposedConnections() external view returns (address[] memory) {
        // Return array of proposed connection addresses
        // Return empty array if no proposed connections
        return proposedConnections;
    }

    function isProposedConnection(address _profile) public view returns (bool) {
        // Check if the given address is in the list of proposed connections
        // Return true if proposed, false otherwise
        return proposedConnections[_profile];
    }
    
    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

interface ExternalProfile {
    function externalProposeConnect(address _proposingProfile) external;
}