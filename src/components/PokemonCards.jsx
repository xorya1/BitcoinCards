import pokemon from "pokemontcgsdk";
import PokemonCard from "./PokemonCard";
import { useLocation } from "react-router-dom";

pokemon.configure({ apiKey: "f4be0dd2-ff36-42c2-9a1e-c50c11a36b4d" });

/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
const PokemonCards = ({ 
  mintCardNFT, 
  pokemonCards, 
  allCards, 
  put_card_on_sale, 
  get_cards_on_sale, 
  cardOnSale, 
  remove_card_on_sale, 
  accept_card_on_sale 
}) => {
  let buyable = true;
  const location = useLocation();

  return (
    <>
      <div className="pokemonCards">
        <div className="cards-container">  {/* Updated class name */}
          {pokemonCards && pokemonCards.map((item) => {
            if (location.pathname === "/Store") {
              let tabNames = allCards && allCards.map((elem) => elem.name);
              buyable = !allCards || !tabNames.includes(item.id);
            }
            return (
              <div key={item.id}>
                <PokemonCard
                  card={item}
                  fromAPI={true}
                  buyable={buyable}
                  cardOnSale={cardOnSale}
                  mintCardNFT={mintCardNFT}
                  put_card_on_sale={put_card_on_sale}
                  get_cards_on_sale={get_cards_on_sale}
                  remove_card_on_sale={remove_card_on_sale}
                  accept_card_on_sale={accept_card_on_sale}
                />
              </div>
            );
          })}
          {cardOnSale && cardOnSale.map((item) => (
            <div key={item.id}>
              <PokemonCard
                card={item}
                fromAPI={false}
                cardOnSale={cardOnSale}
                mintCardNFT={mintCardNFT}
                put_card_on_sale={put_card_on_sale}
                get_cards_on_sale={get_cards_on_sale}
                remove_card_on_sale={remove_card_on_sale}
                accept_card_on_sale={accept_card_on_sale}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonCards;
