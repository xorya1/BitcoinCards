import pokemon from "pokemontcgsdk";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PokemonCard from "../PokemonCard";

const Boosters = ({ openBooster, ownerCards, opened, setOpened }) => {
  const [teamRocket, setTeamRocket] = useState();
  const [diamonPearl, setDiamonPearl] = useState();
  const [pokemonGO, setPokemonGo] = useState();
  const [celebrations, setCelebrations] = useState();
  const [jungle, setJungle] = useState();
  const [aquapolis, setAquapolis] = useState();
  const [legendaryCollection, setLegendaryCollection] = useState();
  const [rubySapphire, setRubySapphire] = useState();
  const [sandstorm, setSandstorm] = useState();
  const [loading, setLoading] = useState(true);
  const [pokemonCards, setPokemonCards] = useState([]);
  const navigate = useNavigate();

  const fetchPokemonCards = async () => {
    const cartesRes = [];
    for (const item of ownerCards.slice(-3)) {
      const card = await pokemon.card.find(item.name);
      cartesRes.push(card);
    }
    setPokemonCards(cartesRes);
  };

  useEffect(() => {
    if (ownerCards) {
      if (opened) {
        fetchPokemonCards();
      }
      // Fetch booster sets
      const fetchSets = async () => {
        try {
          const [
            teamRocketResult,
            diamonPearlResult,
            pokemonGoResult,
            celebrationsResult,
            jungleResult,
            aquapolisResult,
            legendaryCollectionResult,
            rubySapphireResult,
            sandstormResult,
          ] = await Promise.all([
            pokemon.set.where({ q: "id:base5" }),
            pokemon.set.where({ q: "id:dp1" }),
            pokemon.set.where({ q: "id:pgo" }),
            pokemon.set.where({ q: "id:cel25" }),
            pokemon.set.where({ q: "id:base2" }), // Jungle
            pokemon.set.where({ q: "id:ecard2" }), // Aquapolis
            pokemon.set.where({ q: "id:base6" }), // Legendary Collection
            pokemon.set.where({ q: "id:ex1" }), // Ruby & Sapphire
            pokemon.set.where({ q: "id:ex2" }), // Sandstorm
          ]);
          setTeamRocket(teamRocketResult);
          setDiamonPearl(diamonPearlResult);
          setPokemonGo(pokemonGoResult);
          setCelebrations(celebrationsResult);
          setJungle(jungleResult);
          setAquapolis(aquapolisResult);
          setLegendaryCollection(legendaryCollectionResult);
          setRubySapphire(rubySapphireResult);
          setSandstorm(sandstormResult);
        } catch (error) {
          console.error("Error fetching booster sets:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSets();
    } else {
      navigate("/Install");
    }
  }, [ownerCards, opened, navigate]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <p>Loading .... </p>
        </div>
      ) : (
        <>
          {pokemonCards.length === 0 && (
            <div className="boosters">
              <div className="start-text">Choose a booster!</div>
              <div className="border-top"></div>
              <div className="collections container">
                <div className="collection margin-top--helper">
                  {teamRocket?.data?.[0]?.images?.logo ? (
                    <img
                      src={teamRocket.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(teamRocket.data[0].id, 84n, "5")}
                      alt="Logo of the collection Team Rocket"
                    />
                  ) : (
                    <p>Team Rocket data not available</p>
                  )}
                  <p>5 ETH</p>
                </div>
                <div className="collection">
                  {pokemonGO?.data?.[0]?.images?.logo ? (
                    <img
                      src={pokemonGO.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(pokemonGO.data[0].id, 89n, "10")}
                      alt="Logo of the collection Pokemon GO"
                    />
                  ) : (
                    <p>Pokemon GO data not available</p>
                  )}
                  <p>10 ETH</p>
                </div>
                <div className="collection">
                  {diamonPearl?.data?.[0]?.images?.logo ? (
                    <img
                      src={diamonPearl.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(diamonPearl.data[0].id, 131n, "25")}
                      alt="Logo of the collection Diamond & Pearl"
                    />
                  ) : (
                    <p>Diamond & Pearl data not available</p>
                  )}
                  <p>25 ETH</p>
                </div>
                <div className="collection">
                  {celebrations?.data?.[0]?.images?.logo ? (
                    <img
                      src={celebrations.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(celebrations.data[0].id, 26n, "50")}
                      alt="Logo of the collection Celebrations"
                    />
                  ) : (
                    <p>Celebrations data not available</p>
                  )}
                  <p>50 ETH</p>
                </div>
                {/* New booster sets */}
                <div className="collection">
                  {jungle?.data?.[0]?.images?.logo ? (
                    <img
                      src={jungle.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(jungle.data[0].id, 100n, "20")}
                      alt="Logo of the collection Jungle"
                    />
                  ) : (
                    <p>Jungle data not available</p>
                  )}
                  <p>20 ETH</p>
                </div>
                <div className="collection">
                  {aquapolis?.data?.[0]?.images?.logo ? (
                    <img
                      src={aquapolis.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(aquapolis.data[0].id, 120n, "30")}
                      alt="Logo of the collection Aquapolis"
                    />
                  ) : (
                    <p>Aquapolis data not available</p>
                  )}
                  <p>30 ETH</p>
                </div>
                <div className="collection">
                  {legendaryCollection?.data?.[0]?.images?.logo ? (
                    <img
                      src={legendaryCollection.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(legendaryCollection.data[0].id, 150n, "40")}
                      alt="Logo of the collection Legendary Collection"
                    />
                  ) : (
                    <p>Legendary Collection data not available</p>
                  )}
                  <p>40 ETH</p>
                </div>
                <div className="collection">
                  {rubySapphire?.data?.[0]?.images?.logo ? (
                    <img
                      src={rubySapphire.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(rubySapphire.data[0].id, 110n, "35")}
                      alt="Logo of the collection Ruby & Sapphire"
                    />
                  ) : (
                    <p>Ruby & Sapphire data not available</p>
                  )}
                  <p>35 ETH</p>
                </div>
                <div className="collection">
                  {sandstorm?.data?.[0]?.images?.logo ? (
                    <img
                      src={sandstorm.data[0].images.logo}
                      className="logo--collection"
                      onClick={() => openBooster(sandstorm.data[0].id, 95n, "45")}
                      alt="Logo of the collection Sandstorm"
                    />
                  ) : (
                    <p>Sandstorm data not available</p>
                  )}
                  <p>45 ETH</p>
                </div>
              </div>
            </div>
          )}
          {pokemonCards.length > 0 && (
            <div className="container--OK">
              <div className="pokemon-cards-container animated">
                <div className="grid--3">
                  {pokemonCards.map((item) => (
                    <div key={item.id}>
                      <PokemonCard card={item} />
                    </div>
                  ))}
                </div>
                <div className="container--btn">
                  <button
                    onClick={() => {
                      setPokemonCards([]);
                      setOpened(false);
                    }}
                    className="btn--OK"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
   );
};
export default Boosters;
