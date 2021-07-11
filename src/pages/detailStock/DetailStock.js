import './DetailStock.css'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UpdateStokModal from '../../components/updateStokModal/UpdateStokModal'

export default function DetailStock(props) {

    const { pokemonData, setPrevState, modalData, setModalData, setIsModalOpen, isModalOpen } = props

    const { pokemonName } = useParams()
    const [data, setData] = useState()

    const handleUpdateModal = () => {
        setPrevState({
            nama: data.nama,
            stok: data.stok,
            tanggal: data.tanggal,
            waktu: data.waktu,
            kegiatan: data.kegiatan,
            catatan: data.catatan,
            jmlh: data.jmlh
        })
    }

    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => setIsModalOpen(false)

    useEffect(() => {
        const d = pokemonData && pokemonData.filter(f => f.nama === pokemonName)
        d && setData(d[0])
    }, [pokemonData, pokemonName])

    return (
        <div className="DetailStock">
            <div className="detailStockTop">
                <div className="detailStockLeft">
                    <div className="detailStockBack">
                        <Link to="/">
                            <div className="arrowContainer">
                                <img src="/assets/arrow-left.svg" alt="" />
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="backTitleContainer">
                                <h3 className="backTitle">{"Stok Pok\u00E9mon"}</h3>
                            </div>
                        </Link>
                    </div>
                    <div className="detailStockPageTitle">
                        <h1>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
                    </div>
                </div>
                <div className="detailStockRight">
                    <button className="updateStokButton" type="button" onClick={handleOpen}>Update stok</button>
                </div>
            </div>
            <div className="detailStockBottom">
                <div className="sisaStokContainer">
                    <h5 className="sisaStokTitle">Sisa stok</h5>
                    <h4 className="sisaStokTotal">{data && data.stok[0]} pcs</h4>
                </div>
                <div className="riwayatStokContainer">
                    <h3 className="riwayatStokTitle">Riwayat stok</h3>
                    <h5 className="riwayatStokKeterangan">Satuan stok dalam pcs</h5>
                </div>
                <div className="frame2">
                    <div className="frameListItem2">
                        <div className="frameListItemLeft2">
                            <div className="frameListItemHead2">
                                <p>Waktu</p>
                            </div>
                            <div className="frameListItemHead2">
                                <p>Kegiatan</p>
                            </div>
                            <div className="frameListItemHead2">
                                <p>Catatan</p>
                            </div>
                        </div>
                        <div className="frameListItemRight2">
                            <div className="frameListItemHead2 frameListItemJmlh">
                                <p>Jmlh</p>
                            </div>
                            <div className="frameListItemHead2 frameListItemStok">
                                <p>Stok</p>
                            </div>
                        </div>
                    </div>
                    {
                        data && data.waktu.map((d, i) => (
                            <div style={{ width: "100%" }} key={i}>
                                <div className="frameListItem2Body">
                                    <div className="frameListMobileLeft">
                                        {data.tanggal[i] !== data.tanggal[i - 1] &&
                                            (<div className="frameListHeadMobile2 mobile">
                                                <div className="frameListHeadLeftMobile2">
                                                    <p className="frameListHeadItemMobile mobile">{data.tanggal[i]}</p>
                                                </div>
                                                <div className="frameListHeadMiddleMobile2">
                                                    <p className="frameListJmlh2Mobile frameListHeadItemMobile mobile">Jmlh</p>
                                                </div>
                                                <div className="frameListHeadRightMobile2">
                                                    <p className="frameListStok2Mobile frameListHeadItemMobile mobile">Stok</p>
                                                </div>
                                            </div>)
                                        }
                                        <div className="frameListItemBodyMobile">
                                            <div className="frameListItemLeft2">
                                                <div className="frameListItemBody2 waktuTanggal2">
                                                    <p className="tanggal2 desktop">{data.tanggal[i]}</p>
                                                    <p className="komaWaktuTanggal2">,&nbsp;</p>
                                                    <p className="waktu2">{d}</p>
                                                </div>
                                                <div className="frameListItemBody2">
                                                    <p className="frameListItemItemKegiatan2">{data.kegiatan[i]}</p>
                                                </div>
                                                <div className="frameListItemBody2">
                                                    <p>{data.catatan[i]}</p>
                                                </div>
                                            </div>
                                            <div className="frameListItemRight2Mobile mobile">
                                                <div className="frameListItemBody2Mobile frameListItemJmlhMobile">
                                                    <p style={Number(data.jmlh[i]) > 0 ? { color: "#219653" } : Number(data.jmlh[i]) < 0 ? { color: 'red' } : { color: "#333" }}>{Number(data.jmlh[i]) > 0 && "+"}{data.jmlh[i]}</p>
                                                </div>
                                                <div className="frameListItemBody2Mobile frameListItemStokMobile">
                                                    <p>{data.stok[i]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="frameListItemRight2 desktop">
                                        <div className="frameListItemBody2 frameListItemJmlh">
                                            <p style={Number(data.jmlh[i]) > 0 ? { color: "#219653" } : Number(data.jmlh[i]) < 0 ? { color: 'red' } : { color: "#333" }}>{Number(data.jmlh[i]) > 0 && "+"}{data.jmlh[i]}</p>
                                        </div>
                                        <div className="frameListItemBody2 frameListItemStok">
                                            <p>{data.stok[i]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
            <UpdateStokModal
                modalData={modalData}
                setModalData={setModalData}
                isModalOpen={isModalOpen}
                handleClose={handleClose}
                handleUpdateModal={handleUpdateModal}
                pokemonName={pokemonName}
            />
        </div>
    )
}