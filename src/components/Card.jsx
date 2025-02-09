import { useEffect } from "react"

//Fetch characters using API
function Fetch() {
    useEffect(() => {
        const response = fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((res) => res.json())
        .catch((e) => console.error(e))
    
        //Get request for all characters from API
        const resCharacters = response.then((res) => {
            console.log(res.results)
        })
    
        //Filter down to 12 entries
    },[])
}

export {Fetch as "Fetch"}