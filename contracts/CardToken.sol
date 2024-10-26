// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract CardToken is ERC721, Ownable {
    /** ID of the cards */
    uint256 COUNTER;

    /** Counter of the cards on sale */
    uint256 COUNTER_ON_SALE;

    /** Fee to buy a card from the "Base" collection */
    uint256 fee = 1 ether;

    /** Card structure */
    struct Card {
        string name;        // Names of the Card (id in Pokemon API)
        uint256 id;         // COUNTER
        uint256 cardNum;    // Number of the card in its set
        uint256 amount;     // Price of the card (if != 0 => on sale)
        string url;         // Url of the image (only for the Cards from the boosters collections)
    }

    /** All cards minted in the game */
    Card[] public cards;

    /** Minting card event */
    event NewCard(address indexed owner, uint256 id, string name);

    /** Event of the purchase of a card between users */
    event CardPurchased(address indexed buyer, address indexed seller, uint256 cardIndex, uint256 amount);

    constructor()
        ERC721("CardToken", "CTK")
    {}

    /** Private function allowing to mint a Card */
    function _mintCardToken(string memory _name, uint256 _cardNum) internal {
        Card memory newCard = Card(_name, COUNTER, _cardNum, 0, "");
        cards.push(newCard);
        _safeMint(msg.sender, COUNTER);
        emit NewCard(msg.sender, COUNTER, _name);
        COUNTER++;
    }

    /** Public method to mint a Card, called by the front-end with send() */
    function mintCard(string memory _name, uint256 _cardNum) public payable {
        require(msg.value >= fee, "The amount is not correct!");
        _mintCardToken(_name, _cardNum);
    }

    /** Returns all the cards minted in game */
    function getCardTokens() public view returns (Card[] memory) {
        return cards;
    }

    /** Generate a random number between 0 and "_mod" */
    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    /** Allows the owner to update the fee to buy a card */
    function updateFee(uint256 _fee) external onlyOwner() {
        fee = _fee;
    }

    /** Allows the owner to withdraw ETH from the Smart Contract */
    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    /** Getter of the owner's Cards */
    function getOwnerCards(address _owner) public view returns (Card[] memory) {
        Card[] memory res = new Card[](balanceOf(_owner));
        uint256 cpt = 0;
        for (uint256 i = 0; i < cards.length; i++) {
            if (ownerOf(i) == _owner) {
                res[cpt] = cards[i];
                cpt++;
            }
        }
        return res;
    }

    /** Allows the user to open a booster and win cards randomly */
    function openBooster(string memory _collection, uint256 _size) public payable {
        require(msg.value >= getBoosterFee(_collection), "The amount is not correct!");

        for (uint256 i = 0; i < 3; i++) {
            uint256 randomNum = _createRandomNum(_size - i);
            string memory randomNumString = Strings.toString(randomNum);
            string memory concat = string.concat(_collection, "-");
            string memory name = string.concat(concat, randomNumString);
            while (isNameInCards(name)) {
                randomNum = _createRandomNum(_size - i);
                randomNumString = Strings.toString(randomNum);
                concat = string.concat(_collection, "-");
                name = string.concat(concat, randomNumString);
            }
            _mintCardToken(name, randomNum);
        }
    }

    /** Helper function to get the fee based on the collection */
    function getBoosterFee(string memory _collection) internal pure returns (uint256) {
        if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("base5"))) {
            return 5 ether;
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("dp1"))) {
            return 10 ether;
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("pgo"))) {
            return 10 ether;
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("cel25"))) {
            return 15 ether; // Set your fee
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("base2"))) {
            return 20 ether; // Jungle
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("ecard2"))) {
            return 25 ether; // Aquapolis
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("base6"))) {
            return 30 ether; // Legendary Collection
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("ex1"))) {
            return 35 ether; // Ruby & Sapphire
        } else if (keccak256(abi.encodePacked(_collection)) == keccak256(abi.encodePacked("ex2"))) {
            return 40 ether; // Sandstorm
        } else {
            revert("Collection not recognized.");
        }
    }

    /** Contains method. */
    function isNameInCards(string memory _id) public view returns (bool) {
        for (uint i = 0; i < cards.length; i++) {
            if (keccak256(abi.encodePacked(cards[i].name)) == keccak256(abi.encodePacked(_id))) {
                return true; 
            }
        }
        return false; 
    }

    /** Allows owner to put his card to sell in the Store. */
    function putCardOnSale(string memory _id, string memory _images, uint256 _amount) public {
        for (uint i = 0; i < cards.length; i++) {
            if (keccak256(abi.encodePacked(cards[i].name)) == keccak256(abi.encodePacked(_id))) {
                require(ownerOf(i) == msg.sender, "You do not own this card.");
                cards[i].amount = _amount;
                cards[i].url = _images;
                COUNTER_ON_SALE++;
            }
        }
    }
    
    /** Returns all the cards that are on sale */
    function getCardsOnSale() public view returns(Card[] memory) {
        Card[] memory cardOnSale = new Card[](COUNTER_ON_SALE);
        uint256 cpt = 0;

        for (uint i = 0; i < cards.length; i++) {
            if (cards[i].amount > 0) {
               cardOnSale[cpt] = cards[i];
               cpt++;
            }
        }

        return cardOnSale;
    }
    
    /** Does the exchanges between the users */
    function acceptSale(uint256 _counter, address _buyer) public payable {
        address seller = ownerOf(cards[_counter].id);
        require(seller != msg.sender, "You cannot buy your own card again!");
        require(msg.value >= cards[_counter].amount, "The amount is not correct!");
        
        uint256 price = cards[_counter].amount;

        // Ether transfer
        payable(seller).transfer(msg.value);
        
        // Card transfer
        cards[_counter].amount = 0; // not on sale anymore
        _transfer(seller, msg.sender, _counter);
        COUNTER_ON_SALE--;

        emit CardPurchased(_buyer, seller, _counter, price);
    }

    /** Removes the card from the market */
    function noLongerSell(uint256 _counter) public {
        cards[_counter].amount = 0;
        COUNTER_ON_SALE--;
    }
}
