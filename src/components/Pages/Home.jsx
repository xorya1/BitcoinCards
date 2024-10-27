import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import bigPokemonImage from '/home/kali/BitcoinGame/src/assets/pokemon_TCG.png'; // Replace with your Pokémon image path

function Home() {
  return (
    <div className="home-container">
      <div className="image-container">
        <img src={bigPokemonImage} alt="Big Pokémon" className="big-pokemon-image" />
      </div>
      <div className="content-container">
        <h2 className="welcome-text">Welcome to the Project</h2>
        <p className="description">
          This decentralized Pokémon collectible card game allows you to own, trade, and collect digital Pokémon cards as NFTs on the Ethereum blockchain. Mint new cards, explore boosters, and join the fun!
        </p>
        <Link to="/Account" className="explore-button">Explore the Project</Link>
      </div>
    </div>
  );
}

export default Home;
