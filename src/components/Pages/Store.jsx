import PokemonCards from "../PokemonCards";
import { useState, useEffect } from "react";
import pokemon from "pokemontcgsdk";
import { useNavigate } from "react-router-dom";

const Store = ({ mintCardNFT, allCards, cardOnSale, accept_card_on_sale }) => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      pokemon.card.all({ q: "set.id:base1" }).then((pokeCard) => {
        setPokemonCards(pokeCard);
        setLoading(false);
      });
    } else {
      navigate("/Install");
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <p>Loading .... </p>
        </div>
      ) : (
        <div className="store">
          <div className="start-text">Buy your cards!</div>
          <div className="border-top"></div>
          <div className="cards-container">
            <PokemonCards
              pokemonCards={pokemonCards}
              allCards={allCards}
              cardOnSale={cardOnSale}
              mintCardNFT={mintCardNFT}
              accept_card_on_sale={accept_card_on_sale}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Store;
