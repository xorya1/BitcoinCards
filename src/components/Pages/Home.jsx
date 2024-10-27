import React from 'react';
import './Home.css';
import bigPokemonImage from '/home/kali/BitcoinGame/src/assets/pokemon_TCG.png';

function Home() {
  const handleSpinClick = () => {
    const spinner = document.querySelector('.pokemon');
    spinner.classList.add('spin', 'expand');

    setTimeout(() => {
      spinner.classList.remove('spin', 'expand'); // Remove classes after animation
      window.location.href = '/Account'; // Redirect after animation completes
    }, 5000); // Redirect time matches total animation duration
  };

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
        <p className="click-text">
          <span className="arrow">➡</span> Click this spinner to discover the project <span className="arrow">⬅</span>
        </p>
        <div className="spinner-container">
          <div className="pokemon" onClick={handleSpinClick}></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
