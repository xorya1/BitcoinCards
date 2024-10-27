import React from 'react';
import './Home.css';
import bigPokemonImage from '/home/kali/BitcoinGame/src/assets/pokemondaar';

function Home() {
  const handleSpinClick = () => {
    const spinner = document.querySelector('.pokemon');
    spinner.classList.add('spin-and-move');
    setTimeout(() => {
      window.location.href = '/Account';
    }, 5000); // Redirect after animation completes
  };

  return (
    <div className="home-container">
      <div className="left-section">
        <img src={bigPokemonImage} alt="Big Pokémon" className="big-pokemon-image" />
      </div>
      <div className="right-section">
        <h1 className="welcome-text">Welcome to the Pokémon NFT Project</h1>
        <p className="description">
          Discover the world of Pokémon NFTs, where each card is a unique collectible on the Ethereum blockchain. Join the game to start collecting, trading, and exploring exclusive digital Pokémon cards.
        </p>
        <div className="click-instructions">
          <p>Click the Poké Ball spinner to begin your journey!</p>
        </div>
        <div className="spinner-container" onClick={handleSpinClick}>
          <div className="pokemon spinner"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
