import { useEffect, useState } from "react";
import "./../../App.css";
import pokemon from "pokemontcgsdk";
import PokemonCards from "../PokemonCards";
import { useNavigate } from "react-router-dom";

// Mapping Ethereum addresses to user-friendly names locally
const accountNames = {
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199": "DaarUser1",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a": "DaarUser2",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec": "DaarUser3",

  // Add other accounts as needed
};

const Account = ({
  account,
  ownerCards,
  put_card_on_sale,
  get_cards_on_sale,
  cardOnSale,
  remove_card_on_sale,
}) => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (ownerCards) {
      const fetchPokemonCards = async () => {
        const cartesRes = [];
        for (const item of ownerCards) {
          const card = await pokemon.card.find(item.name);
          cartesRes.push(card);
        }
        setPokemonCards(cartesRes);
        setLoading(false);
      };

      fetchPokemonCards();
    } else {
      navigate("/Install");
    }
  }, [ownerCards]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <p>Loading .... </p>
        </div>
      ) : (
        <div className="account">
          <div className="start-text">
            Welcome, <strong>{accountNames[account] || account}</strong>!!
          </div>
          <div className="start-text">
            You have {pokemonCards.length} cards:
          </div>
          <div className="border-top"></div>
          <div className="cards-container">
            <PokemonCards
              pokemonCards={pokemonCards}
              cardOnSale={cardOnSale}
              put_card_on_sale={put_card_on_sale}
              get_cards_on_sale={get_cards_on_sale}
              remove_card_on_sale={remove_card_on_sale}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
