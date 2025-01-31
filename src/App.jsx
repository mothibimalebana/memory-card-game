import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  useEffect(() =>{
    fetch('https://pokeapi.co/api/v2/pokemon/').then((res) => {
      return res.json()
    })
    .then((res) => {
      res.results.filter((item, index) => {
        index < 12 ? console.log(item) : null
      })
    })
    .catch((res) => {
      console.log('something went wrong')
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
