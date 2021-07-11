import './App.css'
import StokPokemon from './pages/stokPokemon/StokPokemon';
import DetailStock from './pages/detailStock/DetailStock';
import KonfirmasiUpdateStok from './pages/konfirmasiUpdateStok/KonfirmasiUpdateStok';
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { getWaktu } from './MyFunc'

function App() {

  const [pokemonData, setPokemonData] = useState()
  const [prevState, setPrevState] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({
    pcs: '',
    lusin: ''
  })

  const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=1118'

  useEffect(() => {
  
    const fetchPokemon = async () => {
      try {
        let pokemon = []
        const res = await axios.get(pokeAPI)
        res.data.results.map(poke => (
          pokemon.push({
            nama: poke.name,
            stok: [0],
            tanggal: ['9 Jul 2021'],
            // tanggal: [getTanggal(Date.now())],
            waktu: [getWaktu(Date.now())],
            kegiatan: ['Stok awal'],
            catatan: ['"Stok awal"'],
            jmlh: [0]
          })
        ))
        setPokemonData(pokemon)
      } catch (err) {
        console.error(err)
      }
    }
    fetchPokemon()

  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <StokPokemon pokemonData={pokemonData} />
          </Route>
          <Route path="/detail-stock/:pokemonName">
            <DetailStock
              pokemonData={pokemonData}
              setPrevState={setPrevState}
              modalData={modalData}
              setModalData={setModalData}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Route>
          <Route path="/konfirmasi-update-stok/:pokemonName">
            {modalData && <KonfirmasiUpdateStok 
              modalData={modalData}
              setModalData={setModalData}
              setPokemonData={setPokemonData}
              pokemonData={pokemonData}
              prevState={prevState}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
