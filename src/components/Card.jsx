import { useEffect, useState } from "react";

// CardItems Component: Displays each character with the sprite image and name
function CardItems({ character, itemNO, shuffleCharacters, addPoint, playerPoints, setPlayerPoints }) {
    const [wasClicked, setWasClicked] = useState(false);
  
    function addPoint(){
      setPlayerPoints(playerPoints => playerPoints + 1)
      console.log(playerPoints)
    }
    function handleClick(){
        shuffleCharacters();
        addPoint()
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
  const [playerPoints, setPlayerPoints] = useState(1);

  function shuffleCharacters(){
    const sortedArr = structuredClone(characters);
    for(let i = sortedArr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]]
    }
    setCharacters(sortedArr);
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const resCharacters = data.results.slice(0, 12); // Get first 12 entries
        const resCharactersIndex = resCharacters.map((item, index) => index + 1)
        console.log(resCharacters)
        console.log(resCharactersIndex)

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
        <CardItems setPlayerPoints={setPlayerPoints} playerPoints={playerPoints} shuffleCharacters={shuffleCharacters} character={character} key={character.name} itemNO={index} />
      ))}
    </div>
  );
}

export { Cards };
