import React from 'react';
import './ProductModal.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function ProductModal({ img, showModal, setShowModal }) {
    const handleClose = () => {
        setShowModal(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 1,
    };

    return (
        <div>
            <Modal
                className="modal"
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modalpaper" sx={style}>
                    <img src={img} alt="on show" />
                </Box>
            </Modal>
        </div>
    );
}

export default ProductModal;
