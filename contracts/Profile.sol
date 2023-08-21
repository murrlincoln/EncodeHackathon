// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Profile is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    struct Connection {
        address profileAddress;
        bool approved;
    }
    string public profileName; // IPFS CID for profile name
    string public profileDescription; // IPFS CID for profile description
    string public profilePictureLink; // IPFS CID for profile picture
    uint256 private postCounter;
    uint256 private proposalCounter;

    address[] public owners;
    mapping(address => bool) public isOwner;

    uint256[] public posts;
    mapping(uint256 => string) public postToCID;

    address[] private proposals;
    mapping(address => bool) private isProposedConnections;
    
    event OwnerAdded(address indexed _newOwner);
    event OwnerRemoved(address indexed _ownerToRemove);
    event ProfileUpdated(string _name, string _description, string _pictureLink);

    event PostMinted(address indexed _owner, uint256 indexed _tokenId, string _contentCID);
    event PostRemoved(address indexed _owner, uint256 indexed _tokenId);
    
    event ConnectionProposed(address indexed _proposingProfile, address indexed _proposedProfile);
    event ConnectionApproved(address indexed _approvingProfile, address indexed _approvedProfile);

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
        emit OwnerAdded(_newOwner);
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

    function mintpostNFT(string memory _contentCID) external onlyOwners {
        // Implementation to create NFT from the content CID
        // Mint NFT and assign it to this contract
        uint256 tokenId = postCounter;
        postCounter++;
        _safeMint(address(this), tokenId);
        _setTokenURI(tokenId, _contentCID);
        posts.push(tokenId);
        postToCID[tokenId] = _contentCID;
        emit PostMinted(address(this), tokenId, _contentCID);
    }

    function listPosts() external view returns (string[] memory) {
        // Return array of post CIDs
        // Return empty array if no posts
        string[] memory postCIDs = new string[](posts.length);
        for (uint256 i = 0; i < posts.length; i++) {
            postCIDs[i] = postToCID[posts[i]];
        }
        return postCIDs;
    }

    function removePost(uint256 _tokenId) external onlyOwners {
        // Implementation to remove NFT from the content CID
        // Burn NFT
        // Remove post from posts array
        // Remove post from postToCID mapping
        _burn(_tokenId);
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i] == _tokenId) {
                posts[i] = posts[posts.length - 1];
                posts.pop();
                break;
            }
        }
        delete postToCID[_tokenId];
        emit PostRemoved(address(this), _tokenId);
    }

    function proposeConnect(address _otherProfile) external onlyOwners {
        //calls another profile smart contract’s externalProposeConnect, adding this address to the list of proposed connections that could be approved or denied by the other user. 
        //First check that the user has not already proposed a connection, in which case it will accept.
        require(!isProposedConnection(_otherProfile), "Connection already proposed");
        ExternalProfile(_otherProfile).externalProposeConnect(address(this));
        emit ConnectionProposed(address(this), _otherProfile);

    }

    function externalProposeConnect(address _proposingProfile) external onlyOwners {
        // called by other profiles to propose a connection.
        proposalCounter++;
        isProposedConnections[_proposingProfile] = true;
        proposals.push(_proposingProfile);
        emit ConnectionProposed(_proposingProfile, address(this));
    }

    function listProposedConnections() external view returns (address[] memory) {
        // Return array of proposed connection addresses
        // Return empty array if no proposed connections
        return proposals;
    }

    function isProposedConnection(address _profile) public view returns (bool) {
        // Check if the given address is in the list of proposed connections
        // Return true if proposed, false otherwise
        return isProposedConnections[_profile];
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

//https://ethereum.stackexchange.com/questions/88020/is-it-possible-for-multiple-smart-contracts-to-interact-together
interface ExternalProfile {
    function externalProposeConnect(address _proposingProfile) external;
}