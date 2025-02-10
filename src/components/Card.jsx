import { useEffect, useState } from "react"
function CardItems({character, itemNO}){

console.log(character.url)
return(
    <>
    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${itemNO}.png`} alt={character.name} />
    <p>{character.name}</p>
    </>
)
}
function Cards(){
    const [characters, setCharacters] = useState([]);
    // Fetch characters using API
    useEffect(() => {
    async function fetchCharacters() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const data = await response.json();
            
            // Filter down to 12 entries and set them to characters useState
            const resCharacters = data.results.slice(0, 12); // Get the first 12 entries
            setCharacters(resCharacters);
        } catch (e) {
            console .error(e);
        }
    };

    fetchCharacters();
}, []);

    return(
        <>
        <div key={crypto.randomUUID()}> 
            {characters.map((item, index) => 
            <CardItems character={item} itemNO={index} key={item.name}/>
            )}
        </div>
        </>
    )
}

export {Cards as "Cards"}