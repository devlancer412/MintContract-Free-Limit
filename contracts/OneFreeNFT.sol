//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract OneFreeMint is Ownable, ERC721 {
    using Strings for uint256;

    uint256 private _tokenIdCounter;

    uint256 mintPrice = 69 * 10**14;
    uint256 freeMintLimit = 2500;
    uint256 walletMintLimit = 10;

    uint256[] changableIds = [1, 2, 123, 456, 234];
    string[] changableURI = ["", "", "", "", ""];

    string private _tokenBaseURI;

    constructor(string memory uri) ERC721("OneFreeMint", "OFM") {
        _tokenBaseURI = uri;
    }

    function getPrice(uint256 amount) public view returns (uint256) {
        require(
            balanceOf(msg.sender) + amount < walletMintLimit,
            "OFM:you already overed mint limit"
        );
        if (balanceOf(msg.sender) == 0 && _tokenIdCounter < freeMintLimit) {
            return (amount - 1) * mintPrice;
        }

        return amount * mintPrice;
    }

    function mint(uint256 amount) public payable {
        require(getPrice(amount) <= msg.value, "OFM:not enough money");

        uint256 newItemId = _tokenIdCounter;
        for (uint256 i = 0; i < amount; i++) {
            _mint(msg.sender, newItemId);
            newItemId++;
        }

        _tokenIdCounter = newItemId;
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        for (uint256 i = 0; i < 5; i++) {
            if (changableIds[i] == tokenId) {
                if (!compareStrings(changableURI[i], "")) {
                    return changableURI[i];
                }

                break;
            }
        }

        return
            bytes(_tokenBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        _tokenBaseURI,
                        "/",
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function setBaseURI(string memory uri) public onlyOwner {
        _tokenBaseURI = uri;
    }

    function changeImage(uint256 index, string memory uri) public onlyOwner {
        require(index < 5, "ERC721Metadata: index is overed, It's just 0 - 4");
        changableURI[index] = uri;
    }

    function getChangableIds() public view returns (uint256[] memory) {
        return changableIds;
    }
}
