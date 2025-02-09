import { useEffect, useState } from "react"

function Cards(){
    const [characters, setCharacters] = useState([]);

//Fetch characters using API
    useEffect(() => {
        const responkeyse = fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((res) => res.json())
        .catch((e) => console.error(e))
    
        //Get request for all characters from API
        const resCharacters = response.then((res) => res.results)
    
        //Filter down to 12 entries
        setCharacters(resCharacters.then((res) => res.filter((item, index) => index < 12).map((item) => console.log(item))))
    },[])

    console.log(characters)
}

export {Cards as "Cards"}