import './KonfirmasiUpdateStok.css'
import { getTanggal, getWaktu } from '../../MyFunc'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UpdateStokModal from '../../components/updateStokModal/UpdateStokModal'

export default function KonfirmasiUpdateStok(props) {

    const { modalData, setModalData, isModalOpen, setIsModalOpen, pokemonData, setPokemonData, prevState } = props

    const [catatanBaru, setCatatanBaru] = useState('')

    const prevStok = Number(prevState.stok[0])
    const selisih = Number(modalData.pcs) + Number(modalData.lusin)
    const hasilHitung = selisih + prevStok
    const namaHurufBesar = prevState.nama.charAt(0).toUpperCase() + prevState.nama.slice(1)

    const handleOpen = () => setIsModalOpen(true)
    const handleClose = () => {
        setIsModalOpen(false)
    }
    const handleChange = (e) => setCatatanBaru(e.target.value)

    let filteredData = []

    const handleCancelData = () => {
        setModalData({
            pcs: '',
            lusin: ''
        })
    }

    const handleSubmitData = () => {
        const newData = {
            ...prevState,
            stok: [hasilHitung, ...prevState.stok],
            tanggal: [getTanggal(Date.now()), ...prevState.tanggal],
            waktu: [getWaktu(Date.now()), ...prevState.waktu],
            kegiatan: ['Update stok', ...prevState.kegiatan],
            catatan: [(catatanBaru.length > 0 ? `"${catatanBaru}"` : ''), ...prevState.catatan],
            jmlh: [selisih, ...prevState.jmlh]
        }
        filteredData = pokemonData.filter(f => f.nama !== prevState.nama)
        filteredData.push(newData)
        setPokemonData(filteredData)
        setModalData({
            pcs: '',
            lusin: ''
        })
    }

    return (
        <div className="KonfirmasiUpdateStok">
            <div className="konfirmasiUpdateStokTopMobile mobile">
                <Link to={"/detail-stock/" + prevState.nama}>
                    <div className="crossContainer">
                        <img src="/assets/cross.svg" alt="" onClick={handleCancelData} />
                    </div>
                </Link>
                <div className="topTitleContainer">
                    <h3 className="topTitle">{namaHurufBesar}</h3>
                </div>
            </div>
            {prevState && (
                <div className="konfirmasiUpdateStokBodyContainerMobile">
                    <h1 className="konfirmasiUpdateStokHeadTitle">Konfirmasi update stok</h1>
                    <p className="konfirmasiUpdateStokSelisih">Selisih</p>
                    <h1 className="konfirmasiUpdateStokTotalUpdate">{selisih >= 0 && "+"}{selisih} pcs</h1>
                    <div className="konfirmasiUpdateStokHasilUpdateContainer">
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate1">
                            <p>Di sistem</p>
                            <h3>{prevStok} pcs</h3>
                        </div>
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate2">
                            <img src="/assets/arrow-right.svg" alt="" />
                        </div>
                        <div className="konfirmasiUpdateStokHasilUpdate konfirmasiUpdateStokHasilUpdate3">
                            <p>Hasil update stok</p>
                            <h3>{hasilHitung} pcs</h3>
                        </div>
                    </div>
                    <div className="konfirmasiUpdateStokDetailStokOpnameMobile mobile">
                        <h3>Detail stok opname</h3>
                    </div>
                    <div className="konfirmasiUpdateStokFrame">
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine1">
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol1"><p>Keterangan</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol2"><p>Detail</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol3"><p>Jumlah</p></div>
                            <div className="konfirmasiUpdateStokLine1 konfirmasiUpdateStokcol4"><p></p></div>
                        </div>
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine2">
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol1">
                                <p>Hasil update stok</p>
                                <p className="konfirmasiUpdateKeteranganMobile mobile">{modalData.pcs || 0} pcs, {modalData.lusin / 12 || 0} lusin</p>
                            </div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol2"><p>{modalData.pcs || 0} pcs, {modalData.lusin / 12 || 0} lusin</p></div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol3"><p>{hasilHitung} pcs</p></div>
                            <div className="konfirmasiUpdateStokLine2 konfirmasiUpdateStokcol4"><img className="konfirmasiUpdateStokLineEdit" src="/assets/pencil.svg" alt="" onClick={handleOpen} /></div>
                        </div>
                        <div className="konfirmasiUpdateFrameLine konfirmasiUpdateFrameLine3">
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol1"><p>Total hasil stok opname</p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol2"><p></p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol3"><p>{hasilHitung} pcs</p></div>
                            <div className="konfirmasiUpdateStokLine3 konfirmasiUpdateStokcol4"><p></p></div>
                        </div>
                    </div>
                    <div className="konfirmasiUpdateStokCatatan">
                        <h3 className="konfirmasiUpdateStokCatatanTitle">Catatan</h3>
                        <form className="konfirmasiUpdateStokForm">
                            <textarea placeholder="Contoh: stok awal" className="konfirmasiUpdateStokCatatanTextarea" value={catatanBaru} name="catatan" id="catatan" rows="3" onChange={e => handleChange(e)}></textarea><br />
                            <div className="konfirmasiUpdateStokButtonContainer">
                                <Link to={"/detail-stock/" + prevState.nama}>
                                    <button className="konfirmasiUpdateStokButton konfirmasiUpdateStokButtonSimpan" type="button" onClick={handleSubmitData}>Simpan</button>
                                </Link>
                                <Link to={"/detail-stock/" + prevState.nama}>
                                    <button className="konfirmasiUpdateStokButton konfirmasiUpdateStokButtonBatal desktop" type="reset" onClick={handleCancelData}>Batal</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <UpdateStokModal
                modalData={modalData}
                setModalData={setModalData}
                isModalOpen={isModalOpen}
                handleClose={handleClose}
                pokemonName={prevState.nama}
            />
        </div>
    )
}