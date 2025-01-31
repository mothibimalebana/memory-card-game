import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() =>{
    fetch('https://pokeapi.co/api/v2/pokemon/').then((res) => {
      return console.log(res)
    })
  },[characters])
}

function App() {
  return (
    <>
    <Characters/>
    </>
  )
}

export default App
