import { useEffect, useState } from "react";

// CardItems Component: Displays each character with the sprite image and name
function CardItems({ character, itemNO, shuffleCharacters, addPoint, playerPoints, setPlayerPoints }) {
    const [wasClicked, setWasClicked] = useState(false);
  
    function addPoint(){
      setPlayerPoints(playerPoints => playerPoints + 1)
      console.log(playerPoints)
    }
    function decisionSystem(){
      wasClicked ? window.location.reload() : addPoint();
    }
    function handleClick(){
        shuffleCharacters();
        decisionSystem()
        setWasClicked(!wasClicked);
        console.log(wasClicked)
    }
    // Construct the sprite image URL using itemNO
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${character.id}.png`;

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
  const [playerPoints, setPlayerPoints] = useState(0);

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
        const gameCharacters = resCharacters.map((item, index) => ({
          name: item.name,
          id: index+1,
        }) )
        setCharacters(gameCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="container">
      <div className="header"><h1>Memory Game: {playerPoints}</h1></div>
      <div className="cards-container">
        {characters.map((character, index) => (
          <CardItems setPlayerPoints={setPlayerPoints} playerPoints={playerPoints} shuffleCharacters={shuffleCharacters} character={character} key={character.name} itemNO={index} />
        ))}
      </div>
    </div>
  );
}

export { Cards };
