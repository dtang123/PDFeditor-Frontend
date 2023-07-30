import React from "react";
import { ButtonRow, ModalContainer } from "../uploadPopup/uploadPopup.styles";
import { DeleteCancelButton, DeletePopupContainer, DeleteSumbitButton } from "./deletePopup.styles";
import { deleteFile } from "../../../backend/update";
import Store from "../../../store/reducers";
import { useDispatch } from "react-redux";
import { setFiles } from "../../../store/filesSlice";


const DeletePopup = ({isOpen, onClose, fileInfo, handleFileDeleted}) => {
    const fileName = fileInfo ? fileInfo.fileName : "";
    const dispatch = useDispatch();

    const deleteSumbit = async () => {
        await deleteFile(Store.getState().user.userId, fileInfo.id)
        handleFileDeleted(fileInfo.id)
        onClose()
    }

    return (
        <DeletePopupContainer isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
            <ModalContainer>
                <h4>Are you sure you want to delete:</h4>
                <h5>{fileName}</h5>
                <ButtonRow>
                    <DeleteCancelButton onClick={onClose}>
                        Cancel
                    </DeleteCancelButton>
                    <DeleteSumbitButton onClick={deleteSumbit}>
                        Delete
                    </DeleteSumbitButton>
                </ButtonRow>
            </ModalContainer>
        </DeletePopupContainer>
    )
}

export default DeletePopup;