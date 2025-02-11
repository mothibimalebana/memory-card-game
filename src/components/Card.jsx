import { useEffect, useState } from "react";

// CardItems Component: Displays each character with the sprite image and name
function CardItems({ character, itemNO, shuffleCharacters, addPoint }) {
    const [wasClicked, setWasClicked] = useState(false);
  
    function addPoint(){

    }
    function handleClick(){
        shuffleCharacters();

        setWasClicked(!wasClicked);
    }
    // Construct the sprite image URL using itemNO
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${itemNO + 1}.png`;

    return (
        <div className="card-item">
        <button onClick={handleClick}>
            <img src={spriteUrl} alt={character.name} />
            <p>{character.name}</p>
        </button>
        </div>
    );
}


// Cards Component: Fetches the Pokémon data and renders cards
function Cards() {
  const [characters, setCharacters] = useState([]);

  function shuffleCharacters(){
    const sortedArr = structuredClone(characters);
    for(let i = sortedArr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]]
    }
    return sortedArr;
  }

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
        <CardItems shuffleCharacters={shuffleCharacters} character={character} key={character.name} itemNO={index} />
      ))}
    </div>
  );
}

export { Cards };
