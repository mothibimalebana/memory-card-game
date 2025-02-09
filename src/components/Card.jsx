import { useEffect, useState } from "react"
function CardItems(character,key){
const cardCharacter = {
    name: character.name,
    img: character.url,
    key: key,
}

return(
    <>
    <div>
        <img src={cardCharacter.img} alt={cardCharacter.name} />
        <p>{cardCharacter.name}</p>
    </div>
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
            console.error(e);
        }
    };

    fetchCharacters();
}, []);

    return(
        <>
        <div>
            {characters.map((item, index) => 
            <CardItems character={item} key={index} />
            )}
        </div>
        </>
    )
}

export {Cards as "Cards"}