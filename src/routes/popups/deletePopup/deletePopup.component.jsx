import React from "react";
import { ButtonRow, ModalContainer } from "../uploadPopup/uploadPopup.styles";
import { DeleteCancelButton, DeletePopupContainer, DeleteSumbitButton } from "./deletePopup.styles";


const DeletePopup = ({isOpen, onClose, fileInfo}) => {
    const fileName = fileInfo ? fileInfo.fileName : "";
    return (
        <DeletePopupContainer isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <ModalContainer>
                <h4>Are you sure you want to delete:</h4>
                <h5>{fileName}</h5>
                <ButtonRow>
                    <DeleteCancelButton onClick={onClose}>
                        Cancel
                    </DeleteCancelButton>
                    <DeleteSumbitButton onClick={onClose}>
                        Delete
                    </DeleteSumbitButton>
                </ButtonRow>
            </ModalContainer>
        </DeletePopupContainer>
    )
}

export default DeletePopup;