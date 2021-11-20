import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { ProductDetailContext } from '../ProductDetail.jsx';
import './ProductAddedDialog.css';

function ProductAddedDialog() {
    const { setOpenDialog, openDialog } = useContext(ProductDetailContext);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <div className="dialog__add">
                    <CheckCircleIcon sx={{ color: green[500] }} />
                    ADDED
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductAddedDialog;
