import { useEffect, useState } from "react";

// CardItems Component: Displays each character with the sprite image and name
function CardItems({ character, itemNO }) {
  // Construct the sprite image URL using itemNO
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${itemNO + 1}.png`;

  return (
    <div className="card-item">
      <img src={spriteUrl} alt={character.name} />
      <p>{character.name}</p>
    </div>
  );
}

// Cards Component: Fetches the Pokémon data and renders cards
function Cards() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const resCharacters = data.results.slice(0, 12); // Get first 12 entries
        setCharacters(resCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="cards-container">
      {characters.map((character, index) => (
        <button key={character.name}>
            <CardItems character={character} itemNO={index} />
        </button>
      ))}
    </div>
  );
}

export { Cards };
