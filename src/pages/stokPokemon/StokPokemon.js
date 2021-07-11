import './StokPokemon.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function StokPokemon({pokemonData}) {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState(pokemonData)

    const handleChange = (e) => setSearchValue(e.target.value)

    useEffect(() => {
        let searchResult = pokemonData && pokemonData.filter(f => f.nama.toLowerCase().includes(searchValue.toLowerCase()))
        setData(searchResult)
    }, [pokemonData, searchValue])

    return (
        <div className="StokPokemon">

            <div className="head">
                <h1 className="headTitle">{"Stok Pok\u00E9mon"}</h1>
            </div>
            <div className="search">
                <img className="searchIcon" src="./assets/search.svg" alt="" />
                <input className="searchInput" type="text" placeholder={'Cari Pok\u00E9mon'} value={searchValue} onChange={(e) => handleChange(e)} />
            </div>
            <div className="frame">
                <div className="frameList">
                    <div className="frameListItem">
                        <h3 className="frameListItemHead">Nama</h3>
                        <h3 className="frameListItemHead">Stok</h3>
                    </div>
                    <hr className="listHr listHrHead" />
                </div>
                {
                    data && data.sort((a,b) => a.nama.localeCompare( b.nama)).map((datum, index) => (
                        index < 10 && (
                            <div className="frameList" key={index}>
                                <div className="frameListItem">
                                    <Link to={"/detail-stock/"+datum.nama}>
                                        <h3 className="frameListItemNama">{datum.nama.charAt(0).toUpperCase() + datum.nama.slice(1)}</h3>
                                    </Link>
                                    <h3>{datum.stok[0]} pcs</h3>
                                </div>
                                <hr className="listHr" />
                            </div>
                        )
                    ))
                }
                
            </div>
        </div>
    )
}
