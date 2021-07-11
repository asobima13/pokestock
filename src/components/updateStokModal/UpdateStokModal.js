import './UpdateStokModal.css'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

export default function UpdateStokModal(props) {

    const { modalData, setModalData, isModalOpen, handleClose, handleUpdateModal, pokemonName } = props

    const styles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px'
        },
        overlay: {
            backgroundColor: 'rgba(51, 51, 51, 0.5)'
        }
    }

    const handleSubmit = () => {
        handleUpdateModal && handleUpdateModal()
        handleClose()
    }

    const handlePcs = (e) => {
        setModalData({
            ...modalData,
            pcs: e.target.value
        })
    }

    const handleLusin = (e) => {
        setModalData({
            ...modalData,
            lusin: e.target.value * 12
        })
    }

    return (
        <div className="UpdateStokModal">
            <Modal
                isOpen={isModalOpen}
                // onRequestClose={closeModal}
                contentLabel="Update Stok Modal"
                style={styles}
                ariaHideApp={false}
            >
                <div className="modalContentWrapper">
                    <h3 className="modalHeadTitle">Update stok</h3>
                    <p>Masukkan jumlah stok yang tersedia di rak</p>
                    <p className="modalSubheaderTitle">saat ini.</p>
                    <form>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1 modalContentHead">Kemasan</p>
                            <p className="modalContent modalContent2 modalContentHead">Jumlah</p>
                            <p className="modalContent modalContent3 modalContentHead">Stok</p>
                        </div>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1">Pcs</p>
                            <div className="modalContentInputContainer modalContent2">
                                <span>1 x </span><input type="number" value={modalData.pcs} onChange={(e) => { handlePcs(e) }} className="modalContentInput" /><span> =</span>
                            </div>
                            <p className="modalContent modalContent3">{modalData.pcs || 0}</p>
                        </div>
                        <div className="modalContentContainer">
                            <p className="modalContent modalContent1">Lusin</p>
                            <div className="modalContentInputContainer modalContent2">
                                <span>12 x </span><input type="number" value={modalData.lusin && modalData.lusin / 12} onChange={(e) => { handleLusin(e) }} className="modalContentInput" /><span> =</span>
                            </div>
                            <p className="modalContent modalContent3">{modalData.lusin || 0}</p>
                        </div>
                        <div className="modalContentTotal">
                            <p className="modalContent modalContentBold">Total stok <span>(dalam pcs)</span></p>
                            <p className="modalContent modalContentBold">{(Number(modalData.pcs) + Number(modalData.lusin)) || 0}</p>
                        </div>
                        <div className="modalButtons">
                            <Link to={"/konfirmasi-update-stok/" + pokemonName}>
                                <button className="modalButton modalButtonSimpan" type="submit" onClick={handleSubmit}>Simpan</button>
                            </Link>
                            <button className="modalButton modalButtonBatal" type="reset" onClick={handleClose}>Batal</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
