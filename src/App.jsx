import React from 'react';
import Web3 from 'web3';
import './App.css';
import Install from './components/Install';
import { Route, Routes, BrowserRouter as Router, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardToken from './contracts/contracts/CardToken.sol/CardToken.json';
import { ethers } from 'ethers';
import Account from './components/Pages/Account';
import Boosters from './components/Pages/Boosters';
import Store from './components/Pages/Store';
import logo_TCG from './assets/pokemon_logo.png';

function App() {
  const [account, setAccount] = useState(null);
  const [ownerCards, setOwnerCards] = useState([]);
  const [cardOnSale, setCardOnSale] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [state, setState] = useState(false);
  const [opened, setOpened] = useState(false);
  const web3 = new Web3(window.ethereum);
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

  useEffect(() => {
    getOwnerCards();
    get_cards_on_sale();
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0]);
        setState(!state);
      };
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      };
    }
  }, [state]);

  const getOwnerCards = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, CardToken.abi, provider);
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const acc = accounts[0];
        setAccount(acc);
        const ownerCardss = await contract.getOwnerCards(acc);
        const cardArray = ownerCardss.map((item) => {
          return {
            name: item.name,
            id: parseInt(item.id),
            cardNum: parseInt(item.id),
            amount: parseInt(item.amount),
          };
        });
        setOwnerCards(cardArray);
        console.log('=> ownerCardss: ', cardArray);
        const cards = await contract.getCardTokens();
        const cardArray2 = cards.map((item) => {
          return {
            name: item.name,
            id: parseInt(item.id),
            cardNum: parseInt(item.id),
            amount: parseInt(item.amount),
          };
        });
        setAllCards(cardArray2);
      }
    } catch (error) {
      console.error('Function error: ', error);
    }
  };
  async function mintCardNFT(_cardName, _cardNum) {
    const web3 = new Web3(window.ethereum);
    const acc = await web3.eth.getAccounts();
    const from = acc[0];
    const contract = new web3.eth.Contract(CardToken.abi, contractAddress);
    try {
      const result = await contract.methods
        .mintCard(_cardName, _cardNum)
        .send({ from: from, value: ethers.parseEther('1') });
      console.log(result);
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  }

  async function openBooster(_collection, _size, _eths) {
    const web3 = new Web3(window.ethereum);
    const acc = await web3.eth.getAccounts();
    const from = acc[0];
    const contract = new web3.eth.Contract(CardToken.abi, contractAddress);
    try {
      const result = await contract.methods
        .openBooster(_collection, _size)
        .send({ from: from, value: ethers.parseEther(_eths) });
      console.log(result);
      setState(!state);
      setOpened(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function put_card_on_sale(_id, _images, _amount) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CardToken.abi, contractAddress);
    const acc = await web3.eth.getAccounts();
    const from = acc[0];
    try {
      const result = await contract.methods
        .putCardOnSale(_id, _images, _amount)
        .send({ from: from });
      console.log(result);
      get_cards_on_sale();
    } catch (error) {
      console.error('Function error: ', error);
    }
  }

  async function remove_card_on_sale(_counter) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CardToken.abi, contractAddress);
    const acc = await web3.eth.getAccounts();
    const from = acc[0];
    try {
      const result = await contract.methods
        .noLongerSell(_counter)
        .send({ from: from });
      console.log(result);
      get_cards_on_sale();
    } catch (error) {
      console.error('Function error: ', error);
    }
  }

  async function get_cards_on_sale() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, CardToken.abi, provider);
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const cards = await contract.getCardsOnSale();
        const cardArray = cards.map((item) => {
          return {
            name: item.name,
            id: parseInt(item.id),
            cardNum: parseInt(item.id),
            amount: parseInt(item.amount),
            url: item.url,
          };
        });
        setCardOnSale(cardArray);
        console.log('cardsOnSale: ', cardArray);
      }
    } catch (error) {
      console.error('Function error: ', error);
    }
  }

  async function accept_card_on_sale(_id, _amount) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CardToken.abi, contractAddress);
    const acc = await web3.eth.getAccounts();
    const from = acc[0];
    try {
      const result = await contract.methods
        .acceptSale(_id, from)
        .send({ from: from, value: ethers.parseEther(_amount) });
      console.log(result);
      get_cards_on_sale();
      setState(!state);
    } catch (error) {
      console.error('Function error: ', error);
    }
  }
  return (
    <Router>
      <header className="header">
        <nav className="navbar">
          <div className="logo-container">
            <img src={logo_TCG} className="logo--TCG" alt="Pokemon TCG logo" />
          </div>
          <div className="header-text">
            Let's go Pink!
          </div>
          <ul>
            <li><Link to="/Account">Account</Link></li>
            <li><Link to="/Store">Store</Link></li>
            <li><Link to="/Boosters">Booster</Link></li>
          </ul>
        </nav>
      </header>
      <div className="content">
        <main className="main-content">
          <Routes>
            <Route
              exact
              path="/*"
              element={
                <Account
                  account={account}
                  ownerCards={ownerCards}
                  cardOnSale={cardOnSale}
                  put_card_on_sale={put_card_on_sale}
                  get_cards_on_sale={get_cards_on_sale}
                  remove_card_on_sale={remove_card_on_sale}
                />
              }
            />
            <Route
              path="/Boosters"
              exact
              element={
                <Boosters
                  openBooster={openBooster}
                  ownerCards={ownerCards}
                  opened={opened}
                  setOpened={setOpened}
                />
              }
            />
            <Route
              path="/Store"
              exact
              element={
                <Store
                  mintCardNFT={mintCardNFT}
                  allCards={allCards}
                  cardOnSale={cardOnSale}
                  accept_card_on_sale={accept_card_on_sale}
                />
              }
            />
            <Route
              path="/Install"
              exact
              element={<Install ownerCards={ownerCards} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
                   
