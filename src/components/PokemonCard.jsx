import React, { useState } from "react";
import pokemon from "pokemontcgsdk";
import { useLocation } from "react-router-dom";

pokemon.configure({ apiKey: "f4be0dd2-ff36-42c2-9a1e-c50c11a36b4d" });
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
const PokemonCard = (props) => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");

  /******************************************************************************************************/
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  /******************************************************************************************************/
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length !== 0) {
      props.put_card_on_sale(
        props.card.id,
        props.card.images.small,
        parseInt(inputValue + "n")
      );
    }
  };

  /******************************************************************************************************/
  return (
    <>
      {location.pathname === "/Boosters" ? (
        <div>
          <img
            src={props.card.images.small}
            className="card"
            alt="Pokemon card"
          />
        </div>
      ) : props.buyable ? (
        <div
          className="pokemonCard"
          onClick={() =>
            location.pathname === "/Store" &&
            props.mintCardNFT(props.card.id, props.card.number)
          }
        >
          <img
            src={props.card.images ? props.card.images.small : props.card.url}
            className="card"
            alt="Pokemon card"
          />
          {location.pathname === "/Account" && (
            <>
              {props.cardOnSale
                .map((elem) => elem.name)
                .includes(props.card.id) ? (
                <div className="form--sells">
                  <button
                    className="btn-sells"
                    onClick={() => {
                      const saleItem = props.cardOnSale.find(
                        (elem) => elem.name === props.card.id
                      );
                      props.remove_card_on_sale(saleItem.id);
                    }}
                  >
                    No longer sell for{" "}
                    {
                      props.cardOnSale.find(
                        (elem) => elem.name === props.card.id
                      ).amount
                    }{" "}
                    ETH
                  </button>
                </div>
              ) : (
                <div className="form--sells">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                    />
                    <button className="btn-sells" type="submit">
                      Sell
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          {location.pathname === "/Store" &&
            (props.cardOnSale
              .map((elem) => elem.name)
              .includes(props.fromAPI ? props.card.id : props.card.name) ? ( // name ~ id
              <div className="card cardBuyable">
                <img
                  src={
                    props.card.images ? props.card.images.small : props.card.url
                  }
                  onClick={() => {
                    const saleItem = props.cardOnSale.find(
                      (elem) =>
                        elem.name ===
                        (props.fromAPI ? props.card.id : props.card.name)
                    );
                    props.accept_card_on_sale(
                      parseInt(saleItem.id),
                      saleItem.amount.toString()
                    );
                  }}
                  alt="Pokemon card"
                />
              </div>
            ) : (
              <div className="cardGrey">
                <img
                  src={
                    props.card.images ? props.card.images.small : props.card.url
                  }
                  className="card-not-buyable"
                  alt="Pokemon card"
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default PokemonCard;
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
